import os
import asyncio
import json
import datetime
import time
import math
from pymongo import AsyncMongoClient
from dotenv import load_dotenv
from requests import post

load_dotenv()

MONGODB_CONNECTION_STRING = os.getenv('MONGODB_CONNECTION_STRING')
IGDB_CLIENT_ID = os.getenv('IGDB_CLIENT_ID')
IGDB_AUTHORIZATION = os.getenv('IGDB_AUTHORIZATION')

DATABASE = os.getenv('MONGODB_DATABASE')
GAMES_COLLECTION = os.getenv('MONGODB_GAMES_COLLECTION')

uri = MONGODB_CONNECTION_STRING
client = AsyncMongoClient(uri, connectTimeoutMS=60000, tls=True)

request_headers = {
    'Client-ID': IGDB_CLIENT_ID,
    'Authorization': IGDB_AUTHORIZATION
}

request_timeout = (int(600), int(600))

database = client.get_database(DATABASE) # Select the MongoDB database to use
games = database.get_collection(GAMES_COLLECTION) # Select the database collection

game_ids = []

def create_header(title):
    print("\n--------------------------------")
    print(f"{title}")
    print("--------------------------------")

def add_basic_field(data_object, data_object_key, header, game_object, game_object_key):
    create_header(header)
    lowercaseHeader = header.lower()
    
    if (data_object.get(data_object_key)):
        game_object[game_object_key] = data_object[data_object_key]
        print(f"Got {lowercaseHeader}.")
    else:
        print(f"No {lowercaseHeader} found for this game.")
    
# Used to assign item properties to an object
def assign_item_properties_to_object(object, item, properties):
    if (len(properties) > 0):
        for property in properties:
            if (item.get(property)): object[property] = item[property]

# Title
def get_title(data_object, db_object):
    create_header("Title")
    if (data_object.get('name')):
        db_object['title'] = data_object['name']
        print("Got game title.")
        print(f"Game selected: {data_object['name']}")
    else:
        print("No title found for this game.")

# Cover
def add_cover(data_object, db_object):
    create_header("Cover")
    if (data_object.get('cover')):
        cover_data = data_object['cover']
        cover_object = {'IGDB_cover_id': cover_data['id']}
        assign_item_properties_to_object(cover_object, cover_data, ["image_id", "height", "width", "url"])
        db_object['cover'] = cover_object
    else:
        print("No cover found for this game.")

# Game Type
def add_game_type(data_object, db_object):
    create_header("Game Type")

    if (data_object.get('game_type')):
        print("Game type was found for this game.")

        game_type_object = {'IGDB_game_type_id': data_object['game_type']['id']}
        game_type_data = data_object['game_type']
        if (game_type_data.get('type')): game_type_object['type'] = game_type_data['type']
        db_object['game_type'] = game_type_object

        print("Finished getting game type.")
    else:
        print("No game type found for this game.")

"""
    Upserts a game's child games, if any

    Child games include:
    - DLCs
    - Expansions
    - Standalone Expansions
    - Expanded Games
    - Remakes
    - Remasters
    - Ports
"""
async def upsert_external_games(data_object, key, display, skip_if_updated = True):
    if (data_object.get(key)):
        for item in data_object[key]:
            print(f"Getting data for {display} with id of {item['id']}...")
            await upsert_game(item['id'], skip_if_updated)

async def add_title_suffix(IGDB_game_id, data_object, game):
    title_suffix = " ("

    if (data_object.get('first_release_date')):
        release_date = datetime.date.fromtimestamp(data_object['first_release_date'])
        release_year = release_date.strftime("%Y")
        title_suffix = title_suffix + release_year + " "

    parent_game_result = await games.find_one({ 'IGDB_id': IGDB_game_id })

    if (parent_game_result == None):
        print("No title was found for parent game.")
        return False

    title_to_use = "title"
    if (game.get('name')):
        title_to_use = "name"

    if (
        parent_game_result['title'] == game[title_to_use] and 
        game.get('game_type') and 
        (
            game['game_type']['IGDB_game_type_id'] == 11 or 
            game['game_type']['IGDB_game_type_id'] == 9
        )
    ):
        print("Parent game has the same title as game object")

        game['title'] = game[title_to_use] + title_suffix + game['game_type']['type'] + ")"

        print("Game object title updated.")
        print("Title is now " + game['title'])
        return True
    else:
        print("Parent game has different title than game object.")
        #print(f"parent game result title: {parent_game_result['title']}")
        #print(f"game object title: {game[title_to_use]}")
        return False

async def assign_external_games(header, key, data_object, game_object):
    create_header(header)
    if (data_object.get(key)):
        external_game_array = []
        for external_game in data_object[key]:
            game = await append_external_game(external_game)
            if (game != None):
                external_game_array.append(game)
        
        external_game_array.sort(key=lambda external_game: external_game['first_release_date'] if external_game.get('first_release_date') else math.inf)

        for external_game in external_game_array:
            if (external_game.get('first_release_date')):
                external_game.pop('first_release_date')

        game_object[key] = external_game_array
        print("Successfully retrieved external games")
    else:
        print("No games found for this type")

async def append_external_game(external_game):
    external_game_object = {}

    if (external_game.get('id')):
        external_game_object['IGDB_id'] = external_game['id']
    else:
        return None

    # Title
    get_title(external_game, external_game_object)

    add_cover(external_game, external_game_object)

    add_game_type(external_game, external_game_object)

    print("External game object")
    print(str(external_game_object))

    # First Release Date
    if (external_game.get('first_release_date')):
        external_game_object['first_release_date'] = external_game['first_release_date']

    if (external_game.get('parent_game')):
        await add_title_suffix(external_game['parent_game'], external_game, external_game_object)
        print("Added title suffix")

    return external_game_object

def return_external_game_fields(field):
    return f"""
        {field},
        {field}.name,
        {field}.cover,
            {field}.cover.image_id,
            {field}.cover.height,
            {field}.cover.width,
            {field}.cover.url,
        {field}.first_release_date,
        {field}.game_type,
            {field}.game_type.type,
        {field}.parent_game
    """

async def check_for_updates(IGDB_game_id, IGDB_updated_at_value):
    print(f"Checking for updates...")

    # MongoDB query
    mongodb_game = await games.find_one({ 'IGDB_id': IGDB_game_id })

    if (mongodb_game == None): # If no games are found; mongodb_game value is None
        print(f"Game with ID of {IGDB_game_id} not found in database.")
        return True
    
    if (mongodb_game.get('IGDB_updated_at')):
        print(f"Game with ID of {IGDB_game_id} found in database.")
        if (IGDB_updated_at_value > mongodb_game['IGDB_updated_at']):
            return True
    
    return False

async def upsert_game(IGDB_game_id, skip_if_updated = True):
    print(f"Starting upsert process for ID of {IGDB_game_id}")

    try:
        # API query
        create_header("Search")
        print(f"Searching IGDB API for a game with IGDB id of {IGDB_game_id}...\n")

        # Using apicalypse's dot notation reduces the amount of queries needed to be run, speeding up the script's execution and reducing complexity
        igdb_api_response = post(
            'https://api.igdb.com/v4/multiquery',
            timeout=request_timeout,
            **{
                'headers': request_headers,
                'data': """
                    query games "Game Data" {
                    fields
                        name,

                        alternative_names,
                            alternative_names.name,
                            alternative_names.comment,
                        
                        version_title,
                        storyline,
                        summary,

                        platforms,
                            platforms.name,
                            platforms.platform_logo,

                        first_release_date,

                        release_dates,
                            release_dates.date,
                            release_dates.platform,
                                release_dates.platform.name,
                            release_dates.release_region,
                                release_dates.release_region.region,
                            release_dates.status,
                                release_dates.status.name,

                        game_modes,
                            game_modes.name,
                        
                        multiplayer_modes,
                            multiplayer_modes.campaigncoop,
                            multiplayer_modes.dropin,
                            multiplayer_modes.lancoop,
                            multiplayer_modes.offlinemax,
                            multiplayer_modes.offlinecoop,
                            multiplayer_modes.offlinecoopmax,
                            multiplayer_modes.onlinecoop,
                            multiplayer_modes.onlinecoopmax,
                            multiplayer_modes.onlinemax,
                            multiplayer_modes.splitscreen,
                            multiplayer_modes.splitscreenonline,
                            multiplayer_modes.platform,
                                multiplayer_modes.platform.name,

                        game_engines,
                            game_engines.name,
                            game_engines.platforms,
                                game_engines.platforms.name,

                        player_perspectives,
                            player_perspectives.name,

                        screenshots,
                            screenshots.image_id,
                            screenshots.game,
                            screenshots.height,
                            screenshots.width,
                            screenshots.url,

                        videos,
                            videos.video_id,
                            videos.name,

                        rating,
                        rating_count,
                        aggregated_rating,
                        aggregated_rating_count,
                        total_rating,
                        total_rating_count,

                        genres,
                            genres.name,

                        artworks,
                            artworks.image_id,
                            artworks.url,
                            artworks.width,
                            artworks.height,
                            artworks.artwork_type,
                                artworks.artwork_type.name,

                        involved_companies,
                            involved_companies.company,
                                involved_companies.company.name,
                            involved_companies.developer,
                            involved_companies.porting,
                            involved_companies.publisher,
                            involved_companies.supporting,

                        keywords,
                            keywords.name,

                        themes,
                            themes.name,

                        websites,
                            websites.type,
                                websites.type.type,
                            websites.url,
                            websites.trusted,

                        age_ratings,
                            age_ratings.organization,
                                age_ratings.organization.name,
                            age_ratings.rating_category,
                                age_ratings.rating_category.organization,
                                age_ratings.rating_category.rating,
                            age_ratings.rating_content_descriptions,
                                age_ratings.rating_content_descriptions.organization,
                                age_ratings.rating_content_descriptions.description,
                            age_ratings.rating_cover_url,

                        language_supports,
                            language_supports.language,
                                language_supports.language.name,
                                language_supports.language.native_name,
                            language_supports.language_support_type,
                                language_supports.language_support_type.name,

                        game_localizations,
                            game_localizations.name,
                            game_localizations.region,
                                game_localizations.region.name,
                                game_localizations.region.identifier,
                                game_localizations.region.category,

                        game_status,
                            game_status.status,

                        hypes,
                        url,
                        created_at,
                        updated_at,

                        cover.id,
                            cover.image_id,
                            cover.height,
                            cover.height,
                            cover.url,

                        game_type,
                            game_type.type,

                        parent_game,
                            parent_game.name,
                            parent_game.cover,
                                parent_game.cover.image_id,
                                parent_game.cover.height,
                                parent_game.cover.width,
                                parent_game.cover.url,
                            parent_game.game_type,
                                parent_game.game_type.type,

                        """ + f"""{return_external_game_fields("dlcs")},
                        {return_external_game_fields("expansions")},
                        {return_external_game_fields("standalone_expansions")},
                        {return_external_game_fields("expanded_games")},
                        {return_external_game_fields("remasters")},
                        {return_external_game_fields("remakes")},
                        {return_external_game_fields("ports")}
                    ;
                    """ +
                    f'where id={IGDB_game_id};' +
                    """
                    };

                    query game_time_to_beats "Time to Beat Data": {
                        fields completely, count, hastily, normally;
                    """ +
                    f'where game_id={IGDB_game_id};' +
                    """
                    };
                    """
            }
        )
        time.sleep(0.251)

        # A game must have an IGDB id to be inserted into the database
        if (len(igdb_api_response.json()) < 1):
            raise SystemExit(f"No game was found for ID of {IGDB_game_id}.")

        IGDB_game_data = {}

        json_response = igdb_api_response.json()
        if (
            json_response[0].get('result') and 
            json_response[0].get('name') and
            json_response[0]['name'] == "Game Data"
        ):
            IGDB_game_data = json_response[0]['result'][0]

        if (
            len(igdb_api_response.json()) > 1 and
            json_response[1].get('result') and
            json_response[1]['name'] == "Time to Beat Data"
        ):
            time_to_beat_data = igdb_api_response.json()[1]['result'][0]
        else:
            time_to_beat_data = {}

    except Exception as e:
        raise Exception(f"IGDB API error: {e}")

    try:
        # Todo - Make sure external games can be updated even if main game doesn't need to be updated
        # Note: This part is still in progress
        """if (IGDB_game_data.get('updated_at') and skip_if_updated == True):
            update_check = await check_for_updates(IGDB_game_id, IGDB_game_data['updated_at'])
            if (update_check == False):
                print(f"This game does not need to be updated.")
                await upsert_external_games(IGDB_game_data, 'dlcs', "DLC", skip_if_updated)
                await upsert_external_games(IGDB_game_data, 'expansions', "expansion", skip_if_updated)
                await upsert_external_games(IGDB_game_data, 'standalone_expansions', 'standalone expansion', skip_if_updated)
                await upsert_external_games(IGDB_game_data, 'expanded_games', "expanded game", skip_if_updated)
                await upsert_external_games(IGDB_game_data, 'remakes', "remake", skip_if_updated)
                await upsert_external_games(IGDB_game_data, 'remasters', "remaster", skip_if_updated)
                await upsert_external_games(IGDB_game_data, 'ports', "port", skip_if_updated)
                return"""

        game_object = {} # Game object that will store data to be upserted into the database

        create_header("Game Object")
        print("Begin making game object...")

        # IGDB game ID
        create_header("Game ID")
        if (IGDB_game_data.get('id')):
            game_object['IGDB_id'] = IGDB_game_data['id']
            print("Got game IGDB id.")
        else:
            print(f"No game was found for IGDB id of {IGDB_game_id}.")
            return

        # Title
        get_title(IGDB_game_data, game_object)

        # Alternative Names
        create_header("Alternative Titles")
        if (IGDB_game_data.get('alternative_names')):
            alternative_names_array = []
            print("Started getting alternative titles...")
            for alternative_name in IGDB_game_data['alternative_names']:
                alternative_name_object = {'IGDB_alternative_name_id': alternative_name['id']}

                if (alternative_name.get('name')): alternative_name_object['title'] = alternative_name['name']
                if (alternative_name.get('comment')): alternative_name_object['comment'] = alternative_name['comment']

                alternative_names_array.append(alternative_name_object)
                if (alternative_name.get('name')):
                    print(f"Alternative title {alternative_name['name']} appended to array.")
                else:
                    print("Alternative title appended to array.")

            print("Finished getting alternative titles.")
        else:
            print("No alternative titles found for this game.")

        # Storyline
        add_basic_field(IGDB_game_data, "storyline", "Storyline", game_object, "storyline")

        # Summary
        add_basic_field(IGDB_game_data, "summary", "Summary", game_object, "summary")

        # Platforms
        create_header("Platforms")
        if (IGDB_game_data.get('platforms')):
            print("Started getting platforms...")
            game_platforms = []

            for platform in IGDB_game_data['platforms']:
                platform_object = {'IGDB_platform_id': platform['id']}

                if (platform.get('name')):
                    platform_object['name'] = platform['name']
                    print("Platform found: " + platform['name'])

                game_platforms.append(platform_object)
            if (len(game_platforms) > 0):
                game_object['platforms'] = game_platforms
                print("Finished getting platforms.")
            else:
                print("No platforms found for this game.")
        else:
            print("No platforms found for this game.")

        # First Release Date
        add_basic_field(IGDB_game_data, "first_release_date", "First Release Date", game_object, "first_release_date")

        # Hypes
        add_basic_field(IGDB_game_data, "hypes", "Hypes", game_object, "hypes")

        # IGDB Created At
        add_basic_field(IGDB_game_data, "created_at", "IGDB Created At", game_object, "IGDB_created_at")

        # IGDB Updated At
        add_basic_field(IGDB_game_data, "updated_at", "IGDB Updated At", game_object, "IGDB_updated_at")

        # Release Dates
        create_header("Release Dates")

        platforms_to_keep = []
        platforms_to_remove = []

        if (IGDB_game_data.get('release_dates')):
            print("Started getting release dates...")
            release_date_array = []

            for release_date in IGDB_game_data['release_dates']:
                if (release_date.get('id')):
                    release_date_object = {'IGDB_release_date_id': release_date['id']}

                    if (release_date.get('date')): release_date_object['date'] = release_date['date']

                    if (release_date.get('platform')):
                        release_platform = release_date['platform']
                        if (release_platform.get('id')):
                            release_platform_object = {'IGDB_platform_id': release_platform['id']}
                            if (release_platform.get('name')):
                                release_platform_object['name'] = release_platform['name']
                                print("Release platform found: " + release_platform['name'])

                            release_date_object['platform'] = release_platform_object

                    if (release_date.get('release_region')):
                        release_region = release_date['release_region']
                        if (release_region.get('id')):
                            release_region_object = {'IGDB_release_region_id': release_region['id']}
                            if (release_region.get('region')): release_region_object['region'] = release_region['region']
                            release_date_object['release_region'] = release_region_object

                    if (release_date.get('status')):
                        release_status = release_date['status']
                        if (release_status.get('id')):
                            release_status_object = {'IGDB_release_date_status_id': release_status['id']}
                            if (release_status.get('name')):
                                release_status_object['name'] = release_status['name']

                                if (release_status.get('platform')):

                                    # If a game has a release platform in which the release date was cancelled, we don't
                                    # want that platform to be part of the game's listed platforms
                                    if (release_status['name'] != 'Cancelled'):
                                        print("Found a platform to keep")

                                        # If the platform to keep isn't already in the platforms_to_keep array, append it to the array
                                        if (platforms_to_keep.count(release_date['platform']) == 0):
                                            platforms_to_keep.append(release_date['platform'])

                                        # If the platform is present in the platforms_to_remove array, remove it from the array
                                        if (platforms_to_remove.count(release_date['platform']) > 0):
                                            platforms_to_remove.remove(release_date['platform'])
                                    else:
                                        # If the release date's status is cancelled and platforms_to_keep does not contain
                                        # the platform, add the platform to the platforms_to_remove array
                                        if (platforms_to_keep.count(release_date['platform']) == 0):
                                            print("Found a platform to remove")
                                            platforms_to_remove.append(release_date['platform'])

                            release_date_object['release_date_status'] = release_status_object

                    release_date_array.append(release_date_object)

            # Sort release dates by earliest to latest
            release_date_array.sort(key=lambda release: release['date'] if release.get('date') else math.inf)
            game_object['release_dates'] = release_date_array

            # If any, remove any platforms in the platforms_to_remove array from game_object's platforms
            if (len(platforms_to_remove) > 0):
                for platform in game_object['platforms']:
                    if (platforms_to_remove.count(platform['IGDB_platform_id']) > 0):
                        game_object['platforms'].remove(platform)

        else:
            print("No release dates found for this game.")

        # Game Modes
        create_header("Game Modes")
        if (IGDB_game_data.get('game_modes')):
            print("Started getting game modes...\n")
            game_mode_array = []

            for game_mode in IGDB_game_data['game_modes']:
                if (game_mode.get('id')):
                    game_mode_object = {'IGDB_game_mode_id': game_mode['id']}
                    if (game_mode.get('name')): game_mode_object['name'] = game_mode['name']

                    game_mode_array.append(game_mode_object)
                    if (game_mode.get('name')):
                        print("Game mode " + game_mode['name'] + " successfully appended to array.")

            game_object['game_modes'] = game_mode_array
            print("Game modes successfully added to object.")
        else:
            print("No game modes found for this game.")

        # Multiplayer Modes
        create_header("Multiplayer Modes")
        if (IGDB_game_data.get('multiplayer_modes')):
            print("Started getting multiplayer modes...\n")
            multiplayer_mode_array = []

            for multiplayer_mode in IGDB_game_data['multiplayer_modes']:
                if (multiplayer_mode.get('id')):
                    multiplayer_mode_object = {'IGDB_multiplayer_mode_id': multiplayer_mode['id']}

                    mode_array = [
                        'campaigncoop',
                        'dropin',
                        'lancoop',
                        'offlinemax',
                        'offlinecoop',
                        'offlinecoopmax',
                        'onlinecoop',
                        'onlinecoopmax',
                        'onlinemax',
                        'splitscreen',
                        'splitscreenonline'
                    ]

                    assign_item_properties_to_object(multiplayer_mode_object, multiplayer_mode, mode_array)

                    if (multiplayer_mode.get('platform')):
                        multiplayer_mode_platform_data = multiplayer_mode['platform']
                        if (multiplayer_mode_platform_data.get('id')):
                            multiplayer_mode_platform_object = {'IGDB_platform_id': multiplayer_mode_platform_data['id']}
                            if (multiplayer_mode_platform_data.get('name')): multiplayer_mode_platform_object['name'] = multiplayer_mode_platform_data['name']

                            multiplayer_mode_object['platform'] = multiplayer_mode_platform_object
                        
                    multiplayer_mode_array.append(multiplayer_mode_object)

            game_object['multiplayer_modes'] = multiplayer_mode_array
            print("Got multiplayer mode data.")
        else:
            print("No multiplayer modes found for this game.")

        # Game Engines
        create_header("Game Engines")
        if (IGDB_game_data.get('game_engines')):
            print("Started getting game engine data...")
            game_engines = []

            for game_engine in IGDB_game_data['game_engines']:
                if (game_engine.get('id')):
                    game_engine_object = {'IGDB_game_engine_id': game_engine['id']}

                    if (game_engine.get('name')): game_engine_object['name'] = game_engine['name']

                    if (game_engine.get('platforms')):
                        platform_array = []

                        for platform in game_engine['platforms']:
                            if (platform.get('id')):
                                game_engine_platform_object = {'IGDB_platform_id': platform['id']}
                                if (platform.get('name')): game_engine_platform_object['name'] = platform['name']

                                platform_array.append(game_engine_platform_object)
                            
                        if (len(platform_array) > 0):
                            game_engine_object['platforms'] = platform_array

                    game_engines.append(game_engine_object)

            game_engines.sort(key=lambda engine: engine['name'] if engine.get('name') else '')
            game_object['game_engines'] = game_engines
            print("Successfully obtained game engine data.")
        else:
            print("No game engines found for this game.")

        # Player Perspectives
        create_header("Player Perspectives")
        if (IGDB_game_data.get('player_perspectives')):
            print("Started getting player perspectives...\n")
            player_perspectives = []

            for player_perspective in IGDB_game_data['player_perspectives']:
                if (player_perspective.get('id')):
                    player_perspective_object = {'IGDB_player_perspective_id': player_perspective['id']}
                    if (player_perspective.get('name')): player_perspective_object['name'] = player_perspective['name']

                    player_perspectives.append(player_perspective_object)

            game_object['player_perspectives'] = player_perspectives
            print("Successfully obtained player perspective data.")
        else:
            print("No player perspectives found for this game.")

        # Screenshots
        create_header("Screenshots")
        if (IGDB_game_data.get('screenshots')):
            print("Started getting screenshots...\n")
            game_screenshots = []

            for screenshot in IGDB_game_data['screenshots']:
                if (screenshot.get('id')):
                    screenshot_object = {'IGDB_screenshot_id': screenshot['id']} 

                    assign_item_properties_to_object(screenshot_object, screenshot, ['image_id', 'height', 'width', 'url'])

                    game_screenshots.append(screenshot_object)
                    print(f"Screenshot with IGDB id of {screenshot_object['IGDB_screenshot_id']} appended to screenshot array.")

            game_object['screenshots'] = game_screenshots
            print("\nFinished getting screenshots.")
        else:
            print("No screenshots for this game.")

        # Videos
        create_header("Videos")
        if (IGDB_game_data.get('videos')):
            print("Started getting videos...\n")
            game_videos = []

            for video in IGDB_game_data['videos']:
                if (video.get('id')):
                    video_object = {'IGDB_video_id': video['id']}

                    if (video.get('video_id')): video_object['video_id'] = video['video_id']
                    if (video.get('name')): video_object['title'] = video['name']

                    game_videos.append(video_object)
                    print(f"Added video with IGDB id of {video['id']} to video array.")

            game_object['videos'] = game_videos
            print("Finished getting videos.")
        else:
            print("No videos found for this game.")

        # Rating
        add_basic_field(IGDB_game_data, "rating", "Rating", game_object, "rating")

        # Rating Count
        add_basic_field(IGDB_game_data, "rating_count", "Rating Count", game_object, "rating_count")

        # Aggregated Rating
        add_basic_field(IGDB_game_data, "aggregated_rating", "Aggregated Rating", game_object, "aggregated_rating")

        # Aggregated Rating Count
        add_basic_field(IGDB_game_data, "aggregated_rating_count", "Aggregated Rating Count", game_object, "aggregated_rating_count")

        # Total Rating
        add_basic_field(IGDB_game_data, "total_rating", "Total Rating", game_object, "total_rating")

        # Total Rating Count
        add_basic_field(IGDB_game_data, "total_rating_count", "Total Rating Count", game_object, "total_rating_count")

        # Genres
        create_header("Genres")
        if (IGDB_game_data.get('genres')):
            print("Started getting genres...\n")
            game_genres = []

            for genre in IGDB_game_data['genres']:
                if (genre.get('id')):
                    genre_object = {'IGDB_genre_id': genre['id']}

                    assign_item_properties_to_object(genre_object, genre, ["name", "slug"])

                    game_genres.append(genre_object)
                    print(f"Appended genre object of id {genre['id']}.")

            game_object['genres'] = game_genres
            print("\nFinished getting genres.")
        else:
            print("No genres found for this game.")

        # Artworks
        create_header("Artworks")
        if (IGDB_game_data.get('artworks')):
            print("Started getting artworks...\n")
            game_artworks = [] # Stores everything related to a game's artworks
            game_artwork_types = [] # Stores the artwork type's id and name, as well as any artworks of that type

            for artwork in IGDB_game_data['artworks']:
                artwork_object = {'IGDB_artwork_id': artwork['id']}

                assign_item_properties_to_object(artwork_object, artwork, ["image_id", "url", "width", "height"])

                if (artwork.get('artwork_type')):
                    artwork_type_data = artwork['artwork_type']
                    artwork_type_object = {'IGDB_artwork_type_id': artwork_type_data['id']}
                    if (artwork_type_data.get('name')): artwork_type_object['name'] = artwork_type_data['name']

                    artwork_check = False
                    artwork_index = -1

                    for index, artwork in enumerate(game_artwork_types):
                        if (artwork.get('IGDB_artwork_type_id')):
                            id = artwork['IGDB_artwork_type_id']
                            if (id == artwork_type_data['id']):
                                artwork_index = index
                                artwork_check = True

                    if (artwork_check == True):
                        game_artwork_types[artwork_index]['artworks'].append(artwork_object)
                    else:
                        artwork_type_object['artworks'] = [artwork_object]
                        game_artwork_types.append(artwork_type_object)

            game_artwork_types.sort(key=lambda artwork: artwork['IGDB_artwork_type_id'] if artwork.get('IGDB_artwork_type_id') else math.inf)
            game_object['artwork_types'] = game_artwork_types
            print("Finished getting artworks.")
        else:
            print("No artworks found for this game.")

        # Cover
        add_cover(IGDB_game_data, game_object)

        # Involved Companies
        create_header("Involved Companies")
        if (IGDB_game_data.get('involved_companies')):
            print("Started getting involved companies...\n")
            involvement_array = ["developer", "porting", "publisher", "supporting"]
            game_involved_companies = []

            for involved_company in IGDB_game_data['involved_companies']:
                involved_company_object = {'IGDB_involved_company_id': involved_company['id']}

                if (involved_company.get('name')): involved_company_object['name'] = involved_company['name']

                for involvement in involvement_array:
                    if (involved_company.get(involvement) and involved_company[involvement] == True):
                        involved_company_object[involvement] = involved_company[involvement]

                game_involved_companies.append(involved_company_object)

            game_object['involved_companies'] = game_involved_companies
            print("Finished getting involved companies.")
        else:
            print("No involved companies found for this game.")

        # Keywords
        create_header("Keywords")
        if (IGDB_game_data.get('keywords')):
            print("Started getting keywords...\n")
            game_keywords = []

            for keyword in IGDB_game_data['keywords']:
                keyword_object = {'IGDB_keyword_id': keyword['id']}
                if (keyword.get('name')): keyword_object['name'] = keyword['name']

                game_keywords.append(keyword_object)

                if (keyword.get('name')):
                    print(f"Appended keyword {keyword['name']}.")

            game_object['keywords'] = game_keywords
            print("Finished getting keywords.")
        else:
            print("No keywords found for this game.")

        # Themes
        create_header("Themes")
        if (IGDB_game_data.get('themes')):
            print("Started getting themes...\n")
            game_themes = []

            for theme in IGDB_game_data['themes']:
                theme_object = {'IGDB_theme_id': theme['id']}
                if (theme.get('name')): theme_object['name'] = theme['name']

                game_themes.append(theme_object)

            game_object['themes'] = game_themes
            print("Finished getting themes.")
        else:
            print("No themes found for this game.")

        # Websites
        create_header("Websites")
        if (IGDB_game_data.get('websites')):
            print("Started getting websites...\n")
            game_websites = []

            for website in IGDB_game_data['websites']:
                website_object = {'IGDB_website_id': website['id']}

                if (website.get('type')):
                    website_type = website['type']
                    website_type_object = {'IGDB_website_type_id': website_type['id']}
                    if (website_type.get('type')): website_type_object['type'] = website_type['type']
                    website_object['type'] = website_type_object

                if (website.get('url')): website_object['url'] = website['url']
                if (website.get('trusted') and website['trusted'] == True): website_object['trusted'] = website['trusted']

                game_websites.append(website_object)
                print(f"Got data for website of id {website['id']}.\n")

            game_websites.sort(key=lambda website: website['type']['IGDB_website_type_id'] if website.get('type') else '')
            game_object['websites'] = game_websites
            print("Finished getting websites.")
        else:
            print("No websites found for this game.")

        # IGDB URL
        create_header("IGDB URL")
        if (IGDB_game_data.get('url')):
            game_object['IGDB_url'] = IGDB_game_data['url']
            print("Got IGDB url.")
        else:
            print("No IGDB url was found.")
        
        # Age Ratings
        create_header("Age Ratings")
        if (IGDB_game_data.get('age_ratings')):
            print("Started getting age rating data...\n")
            game_age_ratings = []

            for age_rating in IGDB_game_data['age_ratings']:
                print(f"Getting age rating data for age rating of id {age_rating['id']}...")
                age_rating_object = {'IGDB_age_rating_id': age_rating['id']}

                # Age Rating Categories
                if (age_rating.get('rating_category')):
                    rating_category = age_rating['rating_category']

                    # Content Descriptions
                    if (age_rating.get('rating_content_descriptions')):
                        game_age_rating_content_descriptions = {}

                        esrb_descriptors = []
                        pegi_descriptors = []
                        cero_descriptors = []
                        usk_descriptors = []
                        grac_descriptors = []
                        class_ind_descriptors = []
                        acb_descriptors = []

                        for content_description in age_rating['rating_content_descriptions']:
                            if (content_description.get('organization')):
                                organization = content_description['organization']

                                content_description_object = {'IGDB_content_description_id': content_description['id']}
                                if (content_description.get('description')): content_description_object['description'] = content_description['description']
                                content_description_object['organization'] = content_description['organization']

                                if (organization == 1): esrb_descriptors.append(content_description_object) # ESRB
                                elif (organization == 2): pegi_descriptors.append(content_description_object) # PEGI
                                elif (organization == 3): cero_descriptors.append(content_description_object) # CERO  
                                elif (organization == 4): usk_descriptors.append(content_description_object) # USK
                                elif (organization == 5): grac_descriptors.append(content_description_object) # GRAC
                                elif (organization == 6): class_ind_descriptors.append(content_description_object) # CLASS_IND  
                                elif (organization == 7): acb_descriptors.append(content_description_object) # ACB
                                                
                        if (len(esrb_descriptors) > 0): game_age_rating_content_descriptions = esrb_descriptors
                        if (len(pegi_descriptors) > 0): game_age_rating_content_descriptions = pegi_descriptors
                        if (len(cero_descriptors) > 0): game_age_rating_content_descriptions = cero_descriptors
                        if (len(usk_descriptors) > 0): game_age_rating_content_descriptions = usk_descriptors
                        if (len(grac_descriptors) > 0): game_age_rating_content_descriptions = grac_descriptors
                        if (len(class_ind_descriptors) > 0): game_age_rating_content_descriptions = class_ind_descriptors
                        if (len(acb_descriptors) > 0): game_age_rating_content_descriptions = acb_descriptors
                    else:
                        game_age_rating_content_descriptions = []
                
                # Organization
                if (age_rating.get('organization')):
                    age_rating_object['organization'] = age_rating['organization']
                    organization_data = age_rating['organization']
                    if (organization_data.get('name')): age_rating_object['organization_name'] = organization_data['name']

                if (age_rating.get('rating_category')): age_rating_object['rating_category'] = age_rating['rating_category']
                if (age_rating.get('rating_cover_url')): age_rating_object['rating_cover_url'] = age_rating['rating_cover_url']

                rating_category_object = {'IGDB_rating_category_id': rating_category['id']}
                if (rating_category.get('rating')): rating_category_object['rating'] = rating_category['rating']
                if (rating_category.get('organization')): rating_category_object['organization'] = rating_category['organization']

                age_rating_object['age_rating_category'] = rating_category_object

                game_age_rating_content_descriptions.sort(key=lambda description: description['IGDB_content_description_id'])
                age_rating_object['age_rating_content_descriptions'] = game_age_rating_content_descriptions

                game_age_ratings.append(age_rating_object)

            game_age_ratings.sort(key=lambda rating: rating['organization']['id'])
            game_object['age_ratings'] = game_age_ratings
            print("Finished getting age rating data.")
        else:
            print("No age rating found for this game.")

        # Language Supports
        create_header("Language Supports")
        if (IGDB_game_data.get('language_supports')):
            language_support_array = []
            support_object = {}

            audio_supports = []
            subtitle_supports = []
            interface_supports = []

            language_array = []

            for language_support in IGDB_game_data['language_supports']:
                language_support_object = {'IGDB_language_support_id': language_support['id']}

                if (language_support.get('language')):
                    language_data = language_support['language']

                    language_check = False
                    language_index = -1

                    for index, language in enumerate(language_array):
                        if (language.get('IGDB_language_id')):
                            if (language['IGDB_language_id'] == language_data['id']):
                                language_check = True
                                language_index = index

                    if (language_check == True): 
                        print("Existing language support")
                    else:
                        print("New language support")

                        language_object = {'IGDB_language_id': language_data['id']}
                        if (language_data.get('name')): language_object['name'] = language_data['name']
                        if (language_data.get('native_name')): language_object['native_name'] = language_data['native_name']

                    if (language_support.get('language_support_type')):
                        language_support_type_data = language_support['language_support_type']
                        language_support_type_id = language_support_type_data['id']
                        language_type = ""

                        if (language_support_type_id == 1): language_type = "audio"
                        elif (language_support_type_id == 2): language_type = "subtitles"
                        elif (language_support_type_id == 3): language_type = "interface"

                        if (language_check == True): # Language exists in array
                            language_array[language_index][language_type] = True
                        else: # Language does not exist in array
                            language_object[language_type] = True
                            language_array.append(language_object)

            language_array.sort(key=lambda language: language['native_name'] if language.get('native_name') else "")
            game_object['language_supports'] = language_array
            print("Finished getting language support data.")
        else:
            print("No language supports found for this game.")

        # Game Localizations
        create_header("Game Localizations")
        if (IGDB_game_data.get('game_localizations')):
            print("Started getting game localizations...\n")
            game_localization_array = []
            
            for localization in IGDB_game_data['game_localizations']:
                game_localization_object = {'IGDB_game_localization_id': localization['id']}
                if (localization.get('name')): game_localization_object['name'] = localization['name']

                if (localization.get('region')):
                    region_data = localization['region']
                    region_object = {'IGDB_region_id': region_data['id']}

                    assign_item_properties_to_object(region_object, region_data, ["name", "category", "identifier"])
                    game_localization_object['region'] = region_object

                game_localization_array.append(game_localization_object)

            game_localization_array.sort(key=lambda localization: localization['name'] if localization.get('name') else '')
            game_object['game_localizations'] = game_localization_array
            print("Finished getting game localizations.")
        else:
            print("No localizations found for this game.")

        # Game Type
        add_game_type(IGDB_game_data, game_object)

        # Game Status
        create_header("Game Status")
        if (IGDB_game_data.get('game_status')):
            print("Game status found.")

            game_status_data = IGDB_game_data['game_status']
            game_status_object = {'IGDB_game_status_id': game_status_data['id']}
            if (game_status_data.get('status')): game_status_object['status'] = game_status_data['status']
            game_object['game_status'] = game_status_object

            print("Finished getting game status.")
        else:
            print("No game status found for this game.")

        # Time to Beat (Requires separate query)
        create_header("Time to Beat")
        if (time_to_beat_data.get('id')):
            game_time_to_beat_object = {'IGDB_time_to_beat_id': time_to_beat_data['id']}

            assign_item_properties_to_object(game_time_to_beat_object, time_to_beat_data, ["completely", "count", "hastily", "normally"])

            game_object['game_time_to_beat'] = game_time_to_beat_object
            print("Got times to beat.")
        else:
            print("No times to beat were found.")
        
        # Parent Game
        create_header("Parent Game")
        print("Checking if this game has a parent game...")
        if (IGDB_game_data.get('parent_game')):
            parent_count = await games.count_documents({'IGDB_id': IGDB_game_data['parent_game']['id']})
            if (parent_count > 0):
                print("Parent game found.")
                parent_game = await append_external_game(IGDB_game_data['parent_game'])
                if (parent_game != None):
                    game_object['parent_game'] = parent_game
            
                added_title_suffix = await add_title_suffix(IGDB_game_data['parent_game']['id'], IGDB_game_data, game_object)
                if (added_title_suffix == True):
                    print("Added title suffix")
                else:
                    print("Did not add title suffix.")
            else:
                print("MongoDB query did not find a parent game for this game.")
        else:
            print("No parent game found for this game.")

        # DLCs
        await assign_external_games("DLCs", "dlcs", IGDB_game_data, game_object)

        # Expansions
        await assign_external_games("Expansions", "expansions", IGDB_game_data, game_object)

        # Standalone Expansions
        await assign_external_games("Standalone Expansions", "standalone_expansions", IGDB_game_data, game_object)

        # Expanded Games
        await assign_external_games("Expanded Games", "expanded_games", IGDB_game_data, game_object)

        # Remasters
        await assign_external_games("Remasters", "remasters", IGDB_game_data, game_object)

        # Remakes
        await assign_external_games("Remakes", "remakes", IGDB_game_data, game_object)

        # Ports
        await assign_external_games("Ports", "ports", IGDB_game_data, game_object)

        # MongoDB Operation
        create_header("MongoDB Operation")

        # Query
        count_query = await games.count_documents({'IGDB_id': IGDB_game_id})

        current_time = time.time()
        game_object['updated_at'] = current_time

        if (count_query > 0):
            print("Operation: Update")

            query_filter = {'IGDB_id': IGDB_game_data['id']}

            find_result = await games.find_one(query_filter)

            unset_array = []
            game_object_keys = game_object.keys() # Gets all fields of game_object

            for key in find_result.keys():
                # game_object isn't assigned the _id or created_at fields, so we disregard those fields
                if ((key not in game_object_keys) and (key != "_id") and (key != "created_at")):
                    unset_array.append(key)
                    print(key)

            update_operation = {'$set': game_object}
            unset_object = {}

            if (game_object.get('title')):
                print(f"Preparing to update information for {game_object['title']}...")

            if (len(unset_array) > 0):
                print("unset")

                for field in unset_array:
                    unset_object[field] = ''

                update_operation['$unset'] = unset_object

                result = await games.update_one(query_filter, update_operation)
            else:
                print("do not unset")

                result = await games.update_one(query_filter, update_operation)

            if (game_object.get('title')):
                print(f"{game_object['title']} updated successfully!")
        else:
            print("Operation: Insert")

            game_object['created_at'] = current_time

            insert_operation = game_object

            if (game_object.get('title')):
                print(f"Preparing to insert {game_object['title']} into database...")
            else:
                print("This game does not have a title.")
                #return

            result = await games.insert_one(insert_operation)

            if (game_object.get('title')):
                print(f"{game_object['title']} added successfully!")

        # Upserting child games (if any)
        await upsert_external_games(IGDB_game_data, 'dlcs', "DLC", skip_if_updated)
        await upsert_external_games(IGDB_game_data, 'expansions', "expansion", skip_if_updated)
        await upsert_external_games(IGDB_game_data, 'standalone_expansions', 'standalone expansion', skip_if_updated)
        await upsert_external_games(IGDB_game_data, 'expanded_games', "expanded game", skip_if_updated)
        await upsert_external_games(IGDB_game_data, 'remakes', "remake", skip_if_updated)
        await upsert_external_games(IGDB_game_data, 'remasters', "remaster", skip_if_updated)
        await upsert_external_games(IGDB_game_data, 'ports', "port", skip_if_updated)

    except Exception as e:
        raise Exception(f"Couldn't upsert game with id of {IGDB_game_id} to database: {e}")
        

async def upsert_game_ids(game_ids):
    game_id_array = []

    # Currently, only options 2) and 3) are functioning
    print("Please select an option to continue.\n")
    print("1) Popularity API query")
    print("2) Default game ID array")
    print("3) Update all existing games")
    print("4) Similar games for each ID in the default game ID array")
    print("5) Add games of a given genre")
    print("6) Add games of a given game mode\n")
    upsert_type = input('--> ')

    if (int(upsert_type) < 1 or int(upsert_type) > 6):
        while (int(upsert_type) < 1 or int(upsert_type) > 6):
            print("Please enter a valid menu option:")
            upsert_type = input("--> ")

    if (upsert_type == "1"):
        print("Selected to use a popularity API query.")
    elif (upsert_type == "2"):
        print("You have selected to use the default game ID array.")
        game_id_array = game_ids
    elif (upsert_type == "3"):
        print("You have selected to update all existing games.")
    elif (upsert_type == "4"):
        print("You have selected to upsert similar games based on the contents of the game ID array.")
    elif (upsert_type == "5"):
        genre_choice = 0
        genre_parameter = 0

        print("You have selected to upsert games of a given genre.")

        while (genre_choice > 22 or genre_choice < 1):
            print("\nPlease select a genre:")

            print("1) Adventure")
            print("2) Arcade")
            print("3) Card/Board")
            print("4) Fighting")
            print("5) Hack-and-Slash/Beat-em-up")
            print("6) Indie")
            print("7) MOBA")
            print("8) Music")
            print("9) Platform")
            print("10) Point-and-Click")
            print("11) Puzzle")
            print("12) Quiz/Trivia")
            print("13) Racing")
            print("14) Real-Time Strategy (RTS)")
            print("15) Role-Playing (RPG)")
            print("16) Shooter")
            print("17) Simulator")
            print("18) Sports")
            print("19) Strategy")
            print("20) Tactical")
            print("21) Turn-Based Strategy (TBS)")
            print("22) Visual Novel")

            genre_choice_input = input('--> ')
            genre_choice = int(genre_choice_input)

        print(f"Genre choice: {genre_choice}")

        # Quick lookup object that functions as an alternative to a match statement
        genre_index = {
            1: 31, # Adventure
            2: 33, # Arcade
            3: 35, # Card/Board
            4: 4, # Fighting
            5: 25, # Hack-and-Slash/Beat-em-up
            6: 32, # Indie
            7: 36, # MOBA
            8: 7, # Music
            9: 8, # Platform
            10: 2, # Point-and-Click
            11: 9, # Puzzle
            12: 26, # Quiz/Trivia
            13: 10, # Racing
            14: 11, # Real-Time Strategy (RTS)
            15: 12, # Role-Playing (RPG)
            16: 5, # Shooter
            17: 13, # Simulator
            18: 14, # Sports
            19: 15, # Strategy
            20: 24, # Tactical
            21: 16, # Turn-Based Strategy (TBS)
            22: 34 # Visual Novel
        }

        genre_parameter = genre_index[int(genre_choice)]

        print(f"Genre parameter: {genre_parameter}")
    elif (upsert_type == "6"):
        mode_choice = 0

        print("You have selected to upsert games of a given game mode.")
    
    update_choice = 0
    
    while (update_choice < 1 or update_choice > 2):
        print("\nWould you like to update games regardless of whether they need updates, or only games that need updates?")

        print("1) All games")
        print("2) Only games that need updates")

        update_choice_input = input('--> ')
        update_choice = int(update_choice_input)

    if (update_choice == 2):
        update_option = True
    else:
        update_option = False

    if (
        upsert_type == "1" or
        upsert_type == "2" or
        upsert_type == "4" or
        upsert_type == "5" or
        upsert_type == "6"
    ):
        # We use a loop to iterate through the game id array
        for id in game_id_array:
            await upsert_game(id, update_option)
    elif (upsert_type == "3"):
        async for game in games.find({ 'parent_game': { '$exists': False }}):
            await upsert_game(game['IGDB_id'], update_option)

asyncio.run(upsert_game_ids(game_ids))

print("Finished upserting game ids.") # Message to indicate game id array has been iterated through