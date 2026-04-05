import os
import asyncio
import json
import time
import math
from pymongo import AsyncMongoClient
from dotenv import load_dotenv
from requests import post
from typing import TypedDict

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

game_ids = [
    #int(26602),
    #int(171233),
    #int(17000),
    #int(338106),
    #int(25076),
    #int(151665),
    #int(251833),
    #int(338105),
    #int(26673),
    #int(12517),
    #int(332780),
    #int(348210),
    #int(254339),
    #int(168667),
    #int(134612),
    #int(52189),
    #int(119313),
    #int(217565),
    #int(294041),
    #int(121),
    #int(6705),
    #int(25076),
    #int(366893),
    #int(284716),
    #int(264410),
    #int(251833),
    int(15890),
    int(31463)
]

async def get_popular_games(popularity_type):
    game_id_array = []

    #popularity_response = await IGDB_query("popularity_primitives", "game_id", f'popularity_type={popularity_type}')
    popularity_response = post(
        f'https://api.igdb.com/v4/popularity_primitives',
        timeout = request_timeout,
        **{
            'headers': request_headers,
            'data':
                f'fields game_id;'
                f'sort value desc;'
                f'limit 10;'
                f'where popularity_type={popularity_type};'
        }
    )
    time.sleep(0.251)

    if (len(popularity_response.json()) > 0):
        for game in popularity_response.json():
            game_id_array.append(game['game_id'])
    
    return game_id_array

async def get_similar_games(game_id):
    game_id_array = []

    similar_response = post(
        'https://api.igdb.com/v4/games',
        timeout = request_timeout,
        **{
            'headers': request_headers,
            'data':
                'fields similar_games;'
                f'where id={game_id};'
        }
    )
    time.sleep(0.251)

    if (len(similar_response.json()) > 0):
        similar_game_data = similar_response.json()[0]
        if (similar_game_data.get('similar_games')):
            game_id_array = similar_game_data['similar_games']
    
    return game_id_array

async def get_games_of_attribute(field, attribute_id, popularity_type):
    game_id_array = []

    popularity_response = post(
        f'https://api.igdb.com/v4/popularity_primitives',
        timeout = request_timeout,
        **{
            'headers': request_headers,
            'data':
                f'fields game_id;'
                f'sort value desc;'
                f'limit 100;'
                f'where popularity_type={popularity_type};'
        }
    )
    time.sleep(0.251)

    if (len(popularity_response.json()) > 0):
        for game in popularity_response.json():
            #game_id_array.append(game['game_id'])

            genre_response = post(
                'https://api.igdb.com/v4/games',
                timeout=request_timeout,
                **{
                    'headers': request_headers,
                    'data':
                        'fields id;'
                        'limit 10;'
                        f'where {field}=({attribute_id}) & id={game['game_id']};'
                }
            )
            time.sleep(0.251)

            if (len(genre_response.json()) > 0):
                #genre_data = genre_response.json()[0]
                game_id_array.append(game['game_id'])
                print("Appended game")
            else:
                print("Game did not meet genre requirement.")


    """genre_response = post(
        'https://api.igdb.com/v4/games',
        timeout=request_timeout,
        **{
            'headers': request_headers,
            'data':
                'fields id;'
                'limit 10;'
                f'where genres=({genre_id});'
        }
    )"""

    #print(str(genre_response.json()))

    """if (len(genre_response.json()) > 0):
        genre_data = genre_response.json()
        print(str(genre_data))
        for game in genre_data:
            print(str(game))
            game_id_array.append(game['id'])"""

    return game_id_array

def create_header(title):
    print("\n--------------------------------")
    print(f"{title}")
    print("--------------------------------")

"""async def array_data(object_data, key, endpoint, title, items, game_id):
    create_header(title)
    print(f"Searching IGDB API response for {items} of game with IGDB id of {game_id}...")
    if (object_data.get(key)):
        item_array = []
        print(f"Started getting ")"""

def add_key_basic(data_object, data_object_key, header, game_id, game_object, game_object_key):
    create_header(header)
    lowercaseHeader = header.lower()
    print(f"Searching IGDB API response for {lowercaseHeader} of game with IGDB id of {game_id}...")

    if (data_object.get(data_object_key)):
        game_object[game_object_key] = data_object[data_object_key]
        print(f"Got {lowercaseHeader}.")
    else:
        print(f"No {lowercaseHeader} found for this game.")

async def IGDB_query(endpoint, fields, where):
    response = post(
        f'https://api.igdb.com/v4/{endpoint}',
        timeout = request_timeout,
        **{
            'headers': request_headers,
            'data':
                f'fields {fields};'
                f'where {where};'
        }
    )
    return response

def assign_item_properties_to_object(object, item, properties):
    if (len(properties) > 0):
        for property in properties:
            if (item.get(property)): object[property] = item[property]

async def upsert_external_games(data_object, key, display):
    if (data_object.get(key)):
        for item in data_object[key]:
            print(f"Getting data for {display} with id of {item}...")
            await upsert_game(item)

def get_IGDB_id(data_object, db_object, IGDB_game_id):
    create_header("Game ID")
    if (data_object.get('id')):
        db_object['IGDB_id'] = data_object['id']
        print("Got game IGDB id.")
    else:
        raise SystemExit(f"No game was found for IGDB id of {IGDB_game_id}.")

# Title
def get_title(data_object, db_object, IGDB_game_id):
    create_header("Title")
    print(f"Searching IGDB API response for title of game with IGDB id of {IGDB_game_id}...")
    if (data_object.get('name')):
        db_object['title'] = data_object['name']
        print("Got game title.")
        print(f"Game selected: {data_object['name']}")
    else:
        print("No title found for this game.")

# Cover
async def add_cover(data_object, game_id, db_object):
    create_header("Cover")
    print(f"Searching IGDB API response for cover of game with IGDB id of {game_id}...")
    if (data_object.get('cover')):
        print("Started getting cover...")
        cover_response = await IGDB_query("covers", "image_id, height, width, url", f"game={game_id}")

        if (len(cover_response.json()) > 0):
            cover_data = cover_response.json()[0]
            if (cover_data.get('id')):
                cover_object = {
                    'IGDB_cover_id': cover_data['id']
                }

                assign_item_properties_to_object(cover_object, cover_data, ["image_id", "height", "width", "url"])

                db_object['cover'] = cover_object
        else:
            print("No cover found for this game.")

# Game Type
async def add_game_type(data_object, game_id, db_object):
    create_header("Game Type")
    print(f"Searching IGDB API response for type of game with IGDB id of {game_id}...")
    if (data_object.get('game_type')):
        print("Game type was found for this game.")

        game_type_object = {
            'IGDB_game_type_id': data_object['game_type']
        }
        game_type_response = await IGDB_query("game_types", "type", f"id={data_object['game_type']}")

        if (len(game_type_response.json()) > 0):
            game_type_data = game_type_response.json()[0]

            if (game_type_data.get('type')): game_type_object['type'] = game_type_data['type']

            db_object['game_type'] = game_type_object
            print("Finished getting game type.")
        else:
            print("No game type found for this game.")

async def assign_addons(header, key, data_object, game_object):
    create_header(header)
    if (data_object.get(key)):
        addon_array = []
        for addon in data_object[key]:
            addon_object = await append_add_on(addon)
            addon_array.append(addon_object)
    
        game_object[key] = addon_array

async def append_add_on(IGDB_id):
    try:
        # API query
        igdb_api_response = post(
            'https://api.igdb.com/v4/games',
            timeout=request_timeout,
            **{
                'headers': request_headers,
                'data':
                    'fields *;'
                    f'where id={IGDB_id};'
            }
        )

        if (len(igdb_api_response.json()) < 1):
            return None
        
        IGDB_game_data = igdb_api_response.json()[0]
    
    except Exception as e:
        raise Exception(f"IGDB API error getting add-on data: {e}")
    
    try:
        addon_object = {}

        if (IGDB_game_data.get('id')):
            addon_object['IGDB_id'] = IGDB_game_data['id']
        else:
            return None
        
        """if (IGDB_game_data.get('name')):
            addon_object['title'] = IGDB_game_data['name']
        else:
            print("No title found for this game.")"""
        get_title(IGDB_game_data, addon_object, IGDB_game_data['id'])

        add_key_basic(IGDB_game_data, "first_release_date", "First Release Date", IGDB_id, addon_object, "first_release_date")

        """if (IGDB_game_data.get('cover')):
            cover_response = await IGDB_query("covers", "id, image_id, height, width, url", f"game={IGDB_id}")

            if (len(cover_response.json()) > 0):
                cover_data = cover_response.json()[0]
                if (cover_data.get('id')):
                    cover_object = {
                        'IGDB_cover_id': cover_data['id']
                    }

                    assign_item_properties_to_object(cover_object, cover_data, ["image_id", "height", "width", "url"])

                    addon_object['cover'] = cover_object
        else:
            print("No cover found for this game.")"""
        await add_cover(IGDB_game_data, IGDB_id, addon_object)
        
        """create_header("Game Type")
        if (IGDB_game_data.get('game_type')):
            game_type_object = {
                'IGDB_game_type_id': IGDB_game_data['game_type']
            }
            game_type_response = await IGDB_query("game_types", "type", f"id={IGDB_game_data['game_type']}")

            if (len(game_type_response.json()) > 0):
                game_type_data = game_type_response.json()[0]

                if (game_type_data.get('type')): game_type_object['type'] = game_type_data['type']

                addon_object['game_type'] = game_type_object
                print("Finished getting game type.")
        else:
            print("No game type found for this game.")"""
        await add_game_type(IGDB_game_data, IGDB_id, addon_object)
        
        return addon_object
    except Exception as e:
        print(f"Error getting addon data: {e}")
        return None


async def upsert_game(IGDB_game_id):
    #uri = MONGODB_CONNECTION_STRING
    #client = AsyncMongoClient(uri, connectTimeoutMS=60000, tls=True)

    print(f"Starting upsert process for ID of {IGDB_game_id}")

    try:
        #database = client.get_database(DATABASE) # Select the MongoDB database to use
        #games = database.get_collection(GAMES_COLLECTION) # Select the database collection

        # API query
        create_header("Search")
        print(f"Searching IGDB API for a game with IGDB id of {IGDB_game_id}...\n")

        igdb_api_response = post(
            'https://api.igdb.com/v4/games',
            timeout = request_timeout,
            **{
                'headers': request_headers,
                'data':
                    'fields *;'
                    f'where id={IGDB_game_id};'
            }
        )

        print(str(igdb_api_response.json()))

        if (len(igdb_api_response.json()) < 1):
            raise SystemExit(f"No game was found for ID of {IGDB_game_id}.")

        IGDB_game_data = igdb_api_response.json()[0]

    except Exception as e:
        raise Exception(f"IGDB API error: {e}")

    try:
        game_object = {} # Game object that will store data to be upserted into the database

        create_header("Game Object")
        print("Begin making game object...")

        # IGDB game ID
        create_header("Game ID")
        if (IGDB_game_data.get('id')):
            game_object['IGDB_id'] = IGDB_game_data['id']
            print("Got game IGDB id.")
        else:
            raise SystemExit(f"No game was found for IGDB id of {IGDB_game_id}.")
        #get_IGDB_id(IGDB_game_data, game_object, IGDB_game_id)
        
        # Title
        """create_header("Title")
        print(f"Searching IGDB API response for title of game with id of {IGDB_game_id}...")
        if (IGDB_game_data.get('name')):
            game_object['title'] = IGDB_game_data['name']
            print("Got game title.")
            print(f"Game selected: {game_object['title']}")
        else:
            print("No title found for this game.")"""
        get_title(IGDB_game_data, game_object, IGDB_game_id)
        
        # Alternative Names
        create_header("Alternative Titles")
        print(f"Searching IGDB API response for alternative titles of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('alternative_names')):
            alternative_names_array = []
            print("Started getting alternative titles...")
            for alternative_name in IGDB_game_data['alternative_names']:
                alternative_name_response = post(
                    'https://api.igdb.com/v4/alternative_names',
                    timeout = request_timeout,
                    **{
                        'headers': request_headers,
                        'data':
                            'fields id, name, comment;'
                            f'where id={alternative_name} & game={IGDB_game_id};'
                    }
                )
                time.sleep(0.251)

                if (len(alternative_name_response.json()) > 0):
                    alternative_name_data = alternative_name_response.json()[0]
                    if (alternative_name_data.get('id')):
                        print(f"Getting data for alternative title with id of {alternative_name_data['id']}")

                        alternative_name_object = {
                            'IGDB_alternative_name_id': alternative_name_data['id']
                        }

                        if (alternative_name_data.get('name')): alternative_name_object['title'] = alternative_name_data['name']
                        if (alternative_name_data.get('comment')): alternative_name_object['comment'] = alternative_name_data['comment']

                        alternative_names_array.append(alternative_name_object)
                        print(f"Alternative title with id of {alternative_name_data['id']} appended to array.\n")
                
                game_object['alternative_titles'] = alternative_names_array
                print("Finished getting alternative titles.")
        else:
            print("No alternative titles found for this game.")
        
        # Version Title
        add_key_basic(IGDB_game_data, "version_title", "Version Title", IGDB_game_id, game_object, "version_title")

        # Storyline
        add_key_basic(IGDB_game_data, "storyline", "Storyline", IGDB_game_id, game_object, "storyline")

        # Summary
        add_key_basic(IGDB_game_data, "summary", "Summary", IGDB_game_id, game_object, "summary")

        # Platforms
        create_header("Platforms")
        print(f"Searching IGDB API response for platforms of game with IGDB id of {IGDB_game_id}...")

        if (IGDB_game_data.get('platforms')):
            print("Started getting platforms...")
            game_platforms = []

            for platform in IGDB_game_data['platforms']:
                platform_response = await IGDB_query("platforms", "id, name, platform_logo, slug", f'id={platform}')
                time.sleep(0.251)

                if (len(platform_response.json()) > 0):
                    platform_data = platform_response.json()[0]
                    if (platform_data.get('id')):
                        platform_object = {
                            'IGDB_platform_id': platform_data['id']
                        }

                        if (platform_data.get('name')): platform_object['name'] = platform_data['name']
                        if (platform_data.get('slug')): platform_object['slug'] = platform_data['slug']

                        game_platforms.append(platform_object)
            
            if (len(game_platforms) > 0):
                game_object['platforms'] = game_platforms
                print("Finished getting platforms.")
        else:
            print("No platforms found for this game.")

        # First Release Date
        add_key_basic(IGDB_game_data, "first_release_date", "First Release Date", IGDB_game_id, game_object, "first_release_date")

        # Hypes
        add_key_basic(IGDB_game_data, "hypes", "Hypes", IGDB_game_id, game_object, "hypes")

        # IGDB Created At
        add_key_basic(IGDB_game_data, "created_at", "IGDB Created At", IGDB_game_id, game_object, "IGDB_created_at")

        # IGDB Updated At
        add_key_basic(IGDB_game_data, "updated_at", "Updated At", IGDB_game_id, game_object, "IGDB_updated_at")
        
        # Release Dates
        create_header("Release Dates")
        print(f"Searching IGDB API response for release dates of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('release_dates')):
            print("Started getting release dates...")
            release_date_array = []

            for release_date in IGDB_game_data['release_dates']:
                release_date_response = post(
                    'https://api.igdb.com/v4/release_dates',
                    timeout = request_timeout,
                    **{
                        'headers': request_headers,
                        'data':
                            'fields id, date, platform, release_region, status;'
                            f'where id={release_date} & game={IGDB_game_id};'
                    }
                )
                time.sleep(0.251)

                if (len(release_date_response.json()) > 0):
                    release_date_data = release_date_response.json()[0]
                    if (release_date_data.get('id')):
                        release_date_object = {
                            'IGDB_release_date_id': release_date_data['id']
                        }

                        if (release_date_data.get('date')): release_date_object['date'] = release_date_data['date']

                        if (release_date_data.get('platform')):
                            release_platform_response = await IGDB_query("platforms", "id, name", f'id={release_date_data['platform']}')
                            time.sleep(0.251)

                            if (len(release_platform_response.json()) > 0):
                                release_platform_data = release_platform_response.json()[0]
                                if (release_platform_data.get('id')):
                                    release_platform_object = {
                                        'IGDB_platform_id': release_platform_data['id']
                                    }
                                    if (release_platform_data.get('name')): release_platform_object['name'] = release_platform_data['name']
                                    
                                    release_date_object['platform'] = release_platform_object
                            
                        if (release_date_data.get('release_region')):
                            release_region_response = await IGDB_query("release_date_regions", "id, region", f'id={release_date_data['release_region']}')
                            time.sleep(0.251)

                            if (len(release_region_response.json()) > 0):
                                release_region_data = release_region_response.json()[0]
                                if (release_region_data.get('id')):
                                    release_region_object = {
                                        'IGDB_release_region_id': release_region_data['id']
                                    }
                                    if (release_region_data.get('region')): release_region_object['region'] = release_region_data['region']
                                    
                                    release_date_object['release_region'] = release_region_object
                        
                        if (release_date_data.get('status')):
                            release_date_status_response = await IGDB_query("release_date_statuses", "id, name", f'id={release_date_data['status']}')
                            time.sleep(0.251)

                            if (len(release_date_status_response.json()) > 0):
                                release_date_status_data = release_date_status_response.json()[0]
                                if (release_date_status_data.get('id')):
                                    release_date_status_object = {
                                        'IGDB_release_date_status_id': release_date_status_data['id']
                                    }
                                    if (release_date_status_data.get('name')): 
                                        release_date_status_object['name'] = release_date_status_data['name']

                                        if (release_date_status_data['name'] == 'Cancelled' and release_date_data.get('platform')):
                                            for platform in game_object['platforms']:
                                                if (platform['IGDB_platform_id'] == release_date_data['platform']):
                                                    game_object['platforms'].remove(platform)
                                                    print("Removed platform.")


                                    release_date_object['release_date_status'] = release_date_status_object

                    release_date_array.append(release_date_object)
                
            release_date_array.sort(key=lambda release: release['date'] if release.get('date') else math.inf)
            game_object['release_dates'] = release_date_array
        else:
            print("No release dates found for this game.")
            
        # Game Modes
        create_header("Game Modes")
        print(f"Searching IGDB API response for game modes of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('game_modes')):
            print(f"Game modes found for game with IGDB id of {IGDB_game_id}.")
            print("Started getting game modes...\n")

            game_mode_array = []
            for game_mode in IGDB_game_data['game_modes']:
                game_mode_response = await IGDB_query("game_modes", "id, name, slug", f'id={game_mode}')

                if (len(game_mode_response.json()) > 0):
                    game_mode_data = game_mode_response.json()[0]
                    if (game_mode_data.get('id')):
                        print(f"Found game mode with IGDB id of {game_mode_data['id']}.")

                        game_mode_object = {
                            'IGDB_game_mode_id': game_mode_data['id']
                        }
                        if (game_mode_data.get('name')): game_mode_object['name'] = game_mode_data['name']
                        if (game_mode_data.get('slug')): game_mode_object['slug'] = game_mode_data['slug']

                        game_mode_array.append(game_mode_object)
                        print(f"Game mode with IGDB id of {game_mode_data['id']} successfully added to array.\n")
                
            if (len(game_mode_array) > 0):
                game_object['game_modes'] = game_mode_array
                print("Game modes successfully added to object.")
        else:
            print("No game modes found for this game.")
            
        # Multiplayer Modes
        create_header("Multiplayer Modes")
        print(f"Searching IGDB API response for multiplayer modes of game with IGDB id of {IGDB_game_id}...")

        if (IGDB_game_data.get('multiplayer_modes')):
            print("Started getting multiplayer modes...\n")

            multiplayer_mode_array = []

            for multiplayer_mode in IGDB_game_data['multiplayer_modes']:
                multiplayer_mode_response = await IGDB_query("multiplayer_modes", "id, campaigncoop, dropin, lancoop, offlinemax, offlinecoop, offlinecoopmax, onlinecoop, onlinecoopmax, onlinemax, splitscreen, splitscreenonline, platform", f'id={multiplayer_mode} & game={IGDB_game_id}')

                if (len(multiplayer_mode_response.json()) > 0):
                    multiplayer_mode_data = multiplayer_mode_response.json()[0]
                    if (multiplayer_mode_data.get('id')):
                        multiplayer_mode_object = {
                            'IGDB_multiplayer_mode_id': multiplayer_mode_data['id']
                        }

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

                        for mode in mode_array:
                            if (multiplayer_mode_data.get(mode)): multiplayer_mode_object[mode] = multiplayer_mode_data[mode]

                        if (multiplayer_mode_data.get('platform')):
                            multiplayer_mode_platform_response = await IGDB_query("platforms", "id, name", f"id={multiplayer_mode_data['platform']}")
                            time.sleep(0.251)

                            if (len(multiplayer_mode_platform_response.json()) > 0):
                                multiplayer_mode_platform_data = multiplayer_mode_platform_response.json()[0]
                                if (multiplayer_mode_platform_data.get('id')):
                                    multiplayer_mode_platform_object = {
                                        'IGDB_platform_id': multiplayer_mode_platform_data['id']
                                    }
                                    if (multiplayer_mode_platform_data.get('name')): multiplayer_mode_platform_object['name'] = multiplayer_mode_platform_data['name']

                                    multiplayer_mode_object['platform'] = multiplayer_mode_platform_object

                        multiplayer_mode_array.append(multiplayer_mode_object)
                
            game_object['multiplayer_modes'] = multiplayer_mode_array
            print("Got multiplayer mode data.")
        
        else:
            print("No multiplayer modes found for this game.")
        
        # Game Engines
        create_header("Game Engines")
        print(f"Searching IGDB API response for engines of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('game_engines')):
            print("Started getting game engine data...")
            game_engines = []
            for engine in IGDB_game_data['game_engines']:
                game_engine_response = await IGDB_query("game_engines", "id, name, platforms", f'id={engine}')
                time.sleep(0.251)

                if (len(game_engine_response.json()) > 0):
                    game_engine_data = game_engine_response.json()[0]
                    if (game_engine_data.get('id')):
                        game_engine_object = {
                            'IGDB_game_engine_id': game_engine_data['id']
                        }

                        if (game_engine_data.get('name')): game_engine_object['name'] = game_engine_data['name']

                        if (game_engine_data.get('platforms')):
                            platform_array = []
                            for platform in game_engine_data['platforms']:
                                game_engine_platform_response = await IGDB_query("platforms", "id, name", f'id={platform}')
                                time.sleep(0.251)

                                if (len(game_engine_platform_response.json()) > 0):
                                    game_engine_platform_data = game_engine_platform_response.json()[0]
                                    if (game_engine_platform_data.get('id')):
                                        game_engine_platform_object = {
                                            'IGDB_platform_id': game_engine_platform_data['id']
                                        }
                                        if (game_engine_platform_data.get('name')): game_engine_platform_object['name'] = game_engine_platform_data['name']

                                        platform_array.append(game_engine_platform_object)
                            
                            if (len(platform_array) > 0):
                                game_engine_object['platforms'] = platform_array
                        
                        game_engines.append(game_engine_object)

            game_object['game_engines'] = game_engines
            print("Successfully obtained game engine data.")
        else:
            print("No engines found for this game.")
        
        # Player Perspectives
        create_header("Player Perspectives")
        print(f"Searching IGDB API response for player perspectives of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('player_perspectives')):
            print("Started getting player perspectives...")
            player_perspectives = []
            for perspective in IGDB_game_data['player_perspectives']:
                player_perspective_response = await IGDB_query("player_perspectives", "name", f'id={perspective}')
                time.sleep(0.251)

                if (len(player_perspective_response.json()) > 0):
                    player_perspective_data = player_perspective_response.json()[0]
                    if (player_perspective_data.get('id')):
                        player_perspective_object = {
                            'IGDB_player_perspective_id': player_perspective_data['id']
                        }
                        if (player_perspective_data.get('name')): player_perspective_object['name'] = player_perspective_data['name']

                        player_perspectives.append(player_perspective_object)
            
            game_object['player_perspectives'] = player_perspectives
            print("Successfully obtained player perspective data.")
        else:
            print("No player perspectives found for this game.")
        
        # Screenshots
        create_header("Screenshots")
        print(f"Searching IGDB API response for screenshots of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('screenshots')):
            print("Started getting screenshots...")
            game_screenshots = []
            screenshot_response = await IGDB_query("screenshots", "id, image_id, game, height, width, url, checksum", f'game={IGDB_game_id}')
            screenshot_data = screenshot_response.json()
            if (len(screenshot_data) > 0):
                for screenshot in screenshot_data:
                    if (screenshot.get('id')):
                        print(f'\nGetting data for screenshot with IGDB id of {screenshot['id']}...')
                        screenshot_object = {
                            'IGDB_screenshot_id': screenshot['id']
                        }

                        assign_item_properties_to_object(screenshot_object, screenshot, ['image_id', 'height', 'width', 'url', 'checksum'])

                        game_screenshots.append(screenshot_object)
                        print(f'Screenshot with IGDB id of {screenshot_object['IGDB_screenshot_id']} appended to screenshot array.')

                game_object['screenshots'] = game_screenshots
                print("\nFinished getting screenshots.")
        else:
            print("No screenshots found for this game.")
        
        # Videos
        create_header("Videos")
        print(f"Searching IGDB API response for videos related to game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('videos')):
            print("Started getting videos...")
            video_response = await IGDB_query("game_videos", "id, checksum, game, name, video_id", f'game={IGDB_game_id}')
            
            if (len(video_response.json()) > 0):
                video_data = video_response.json()
                game_videos = []
                for video in video_data:
                    if (video.get('id')):
                        video_object = {
                            'IGDB_video_id': video['id']
                        }
                        
                        assign_item_properties_to_object(video_object, video, ["video_id", "game", "checksum"])
                        if (video.get('name')): video_object['title'] = video['name']

                        game_videos.append(video_object)
                        print(f"Added video with id of {video['id']} to video array.")

                game_object['videos'] = game_videos
                print("Finished getting videos.")
        else:
            print("No videos found for this game.")
        
        # Rating
        add_key_basic(IGDB_game_data, 'rating', "Rating", IGDB_game_id, game_object, "rating")

        # Rating Count
        add_key_basic(IGDB_game_data, 'rating_count', "Rating Count", IGDB_game_id, game_object, "rating_count")

        # Aggregated Rating
        add_key_basic(IGDB_game_data, 'aggregated_rating', "Aggregated Rating", IGDB_game_id, game_object, "aggregated_rating")

        # Aggregated Rating Count
        add_key_basic(IGDB_game_data, 'aggregated_rating_count', "Aggregated Rating Count", IGDB_game_id, game_object, "aggregated_rating_count")

        # Total Rating
        add_key_basic(IGDB_game_data, 'total_rating', "Total Rating", IGDB_game_id, game_object, "total_rating")

        # Total Rating Count
        add_key_basic(IGDB_game_data, 'total_rating_count', "Total Rating Count", IGDB_game_id, game_object, "total_rating_count")

        # Genres
        create_header("Genres")
        print(f"Searching IGDB API response for genres of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('genres')):
            print("Started getting genres...\n")
            game_genres = []

            for genre in IGDB_game_data['genres']:
                genre_response = await IGDB_query("genres", "id, name, slug", f'id={genre}')
                if (len(genre_response.json()) > 0):
                    genre_data = genre_response.json()[0]
                    if (genre_data.get('id')):
                        genre_object = {
                            'IGDB_genre_id': genre_data['id']
                        }
                        
                        assign_item_properties_to_object(genre_object, genre_data, ["name", "slug"])

                        game_genres.append(genre_object)
                        print(f'Appended genre object of id {genre_data['id']}.')
            
            game_object['genres'] = game_genres
            print("\nFinished getting genres.")
        else:
            print("No genres found for this game.")
        
        # Artworks
        create_header("Artworks")
        print(f"Searching IGDB API response for artworks related to game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('artworks')):
            print("Started getting artworks...")
            artwork_response = await IGDB_query("artworks", "id, image_id, url, width, height, artwork_type", f'game={IGDB_game_id}')

            if (len(artwork_response.json()) > 0):
                artwork_data = artwork_response.json()
                game_artworks = []

                for artwork in artwork_data:
                    if (artwork.get('id')):
                        artwork_object = {
                            'IGDB_artwork_id': artwork['id']
                        }

                        assign_item_properties_to_object(artwork_object, artwork, ["image_id", "url", "width", "height"])

                        if (artwork.get('artwork_type')):
                            artwork_type_response = await IGDB_query("artwork_types", "id, name", f'where id={artwork['artwork_type']}')

                            if (len(artwork_type_response.json()) > 0):
                                artwork_type_data = artwork_type_response.json()[0]

                                if (artwork_type_data.get('id')):
                                    artwork_type_object = {
                                        'IGDB_artwork_type_id': artwork_type_data['id']
                                    }
                                    if (artwork_type_data.get('name')): artwork_type_object['name'] = artwork_type_data['name']

                                    artwork_object['artwork_type'] = artwork_type_object
                        
                        game_artworks.append(artwork_object)

            game_object['artworks'] = game_artworks
            print("Finished getting artworks.")
        else:
            print("No artworks found for this game.")
        
        # Cover
        """create_header("Cover")
        print(f"Searching IGDB API response for cover of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('cover')):
            print("Started getting cover...")
            cover_response = await IGDB_query("covers", "id, image_id, height, width, url, checksum", f'game={IGDB_game_id}')

            if (len(cover_response.json()) > 0):
                cover_data = cover_response.json()[0]
                if (cover_data.get('id')):
                    cover_object = {
                        'IGDB_cover_id': cover_data['id']
                    }

                    assign_item_properties_to_object(cover_object, cover_data, ["image_id", "height", "width", "url", "checksum"])

                    game_object['cover'] = cover_object
                    print("Finished getting cover.")
        else:
            print("No cover found for this game.")"""
        await add_cover(IGDB_game_data, IGDB_game_id, game_object)
        
        # Involved Companies
        create_header("Involved Companies")
        print(f"Searching IGDB API response for involved companies of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('involved_companies')):
            print("Started getting involved companies...")
            game_involved_companies = []

            involved_company_response = await IGDB_query("involved_companies", "id, company, developer, porting, publisher, supporting", f'game={IGDB_game_id}')

            if (len(involved_company_response.json()) > 0):
                involved_company_data = involved_company_response.json()

                for involved_company in involved_company_data:
                    company_id = involved_company['company']

                    company_response = await IGDB_query("companies", "name", f'id={company_id}')

                    if (len(company_response.json()) > 0):
                        company_data = company_response.json()[0]

                        if (involved_company.get('id')):
                            involved_company_object = {
                                'IGDB_involved_company_id': involved_company['id']
                            }

                            if (company_data.get('name')): involved_company_object['name'] = company_data['name']

                            involvement_array = ["developer", "porting", "publisher", "supporting"]

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
        print(f"Searching IGDB API response for keywords of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('keywords')):
            print("Started getting keywords...")
            game_keywords = []
            for keyword in IGDB_game_data['keywords']:
                keyword_response = await IGDB_query("keywords", "name", f'id={keyword}')
                time.sleep(0.251) # Done to prevent too many requests

                if (len(keyword_response.json()) > 0):
                    keyword_data = keyword_response.json()[0]
                    if (keyword_data.get('id')):
                        keyword_object = {
                            'IGDB_keyword_id': keyword_data['id']
                        }
                        if (keyword_data.get('name')): keyword_object['name'] = keyword_data['name']

                        game_keywords.append(keyword_object)

                        if (keyword_data.get('name')):
                            print(f"Appended keyword {keyword_data['name']}.")

            game_object['keywords'] = game_keywords
            print("Finished getting keywords.")
        else:
            print("No keywords found for this game.")
        
        # Slug
        add_key_basic(IGDB_game_data, 'slug', "Slug", IGDB_game_id, game_object, "slug")
        
        # Checksum
        add_key_basic(IGDB_game_data, 'checksum', "Checksum", IGDB_game_id, game_object, "checksum")

        # Themes
        create_header("Themes")
        print(f"Searching IGDB API response for themes of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('themes')):
            print("Started getting themes...")
            game_themes = []

            for theme in IGDB_game_data['themes']:
                theme_response = await IGDB_query("themes", "name", f'id={theme}')
                time.sleep(0.251)

                if (len(theme_response.json()) > 0):
                    theme_data = theme_response.json()[0]
                    if (theme_data.get('id')):
                        theme_object = {
                            'IGDB_theme_id': theme_data['id']
                        }
                        if (theme_data.get('name')): theme_object['name'] = theme_data['name']

                        game_themes.append(theme_object)

            game_object['themes'] = game_themes
            print("Finished getting themes.")
        else:
            print("No themes found for this game.")
        
        # Websites
        create_header("Websites")
        print(f"Searching IGDB API response for websites related to game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('websites')):
            print("Started getting websites...")
            game_websites = []

            website_response = await IGDB_query("websites", "type, url, trusted", f'game={IGDB_game_id}')

            if (len(website_response.json()) > 0):
                website_data = website_response.json()
                for website in website_data:
                    if website.get('id'):
                        print(f"Getting data for website of id {website['id']}...")
                        website_object = {
                            'IGDB_website_id': website['id']
                        }

                        if (website.get('type')):
                            website_type_response = await IGDB_query("website_types", "type", f'id={website['type']}')

                            if (len(website_type_response.json()) > 0):
                                website_type_data = website_type_response.json()[0]
                                if (website_type_data.get('id')):
                                    website_type_object = {
                                        'IGDB_website_type_id': website_type_data['id']
                                    }
                                    if (website_type_data.get('type')): website_type_object['type'] = website_type_data['type']
                                    website_object['type'] = website_type_object
                        
                        if (website.get('url')): website_object['url'] = website['url']
                        if (website.get('trusted') and website['trusted'] == True): website_object['trusted'] = website['trusted']

                        game_websites.append(website_object)
                        print(f"Got data for website of id {website['id']}.\n")
            
            if (len(game_websites) > 0):
                game_object['websites'] = game_websites
                print("Finished getting websites.")
            else:
                print("No websites found for this game.")
        else:
            print("No websites found for this game.")

        # IGDB URL
        create_header("IGDB URL")
        print(f"Searching IGDB API response for IGDB url of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('url')):
            game_object['IGDB_url'] = IGDB_game_data['url']
            print("Got IGDB url.")
        else:
            print("No IGDB url was found.")
        
        # Age Ratings
        create_header("Age Ratings")
        print(f"Searching IGDB API response for age ratings of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('age_ratings')):
            print("Started getting age ratings...\n")

            game_age_ratings = []
            for rating in IGDB_game_data['age_ratings']:
                print(f"Getting age rating data for {rating}...")
                age_rating_response = await IGDB_query("age_ratings", "organization, rating_category, rating_content_descriptions, rating_cover_url", f'id={rating}')
                time.sleep(0.251)

                if (len(age_rating_response.json()) > 0):
                    age_rating_data = age_rating_response.json()[0]

                    # Age rating categories
                    if (age_rating_data.get('rating_category')):

                        rating_category_response = await IGDB_query("age_rating_categories", "organization, rating", f'id={age_rating_data['rating_category']}')
                        time.sleep(0.251)

                        if (len(rating_category_response.json()) > 0):
                            rating_category_data = rating_category_response.json()[0]

                            # Content descriptions
                            if (age_rating_data.get('rating_content_descriptions')):
                                game_age_rating_content_descriptions = {}

                                esrb_descriptors = []
                                pegi_descriptors = []
                                cero_descriptors = []
                                usk_descriptors = []
                                grac_descriptors = []
                                class_ind_descriptors = []
                                acb_descriptors = []

                                for content in age_rating_data['rating_content_descriptions']:
                                    content_description_response = await IGDB_query("age_rating_content_descriptions_v2", "organization, description", f'id={content}')
                                    time.sleep(0.251)

                                    if (len(content_description_response.json()) > 0):
                                        content_description_data = content_description_response.json()[0]

                                        #print("Content description data")
                                        #print(str(content_description_data))

                                        if (content_description_data.get('organization')):
                                            organization = content_description_data['organization']

                                            content_description_object = {
                                                'IGDB_content_description_id': content_description_data['id']
                                            }
                                            if (content_description_data.get('description')): content_description_object['description'] = content_description_data['description']
                                            content_description_object['organization'] = content_description_data['organization']

                                            if (organization == 1): # ESRB
                                                esrb_descriptors.append(content_description_object)
                                            elif (organization == 2): # PEGI
                                                pegi_descriptors.append(content_description_object)
                                            elif (organization == 3): # CERO
                                                cero_descriptors.append(content_description_object)
                                            elif (organization == 4): # USK
                                                usk_descriptors.append(content_description_object)
                                            elif (organization == 5): # GRAC
                                                grac_descriptors.append(content_description_object)
                                            elif (organization == 6): # CLASS_IND
                                                class_ind_descriptors.append(content_description_object)
                                            elif (organization == 7): # ACB
                                                acb_descriptors.append(content_description_object)

                                if (len(esrb_descriptors) > 0): game_age_rating_content_descriptions = esrb_descriptors
                                if (len(pegi_descriptors) > 0): game_age_rating_content_descriptions = pegi_descriptors
                                if (len(cero_descriptors) > 0): game_age_rating_content_descriptions = cero_descriptors
                                if (len(usk_descriptors) > 0): game_age_rating_content_descriptions = usk_descriptors
                                if (len(grac_descriptors) > 0): game_age_rating_content_descriptions = grac_descriptors
                                if (len(class_ind_descriptors) > 0): game_age_rating_content_descriptions = class_ind_descriptors
                                if (len(acb_descriptors) > 0): game_age_rating_content_descriptions = acb_descriptors
                            else:
                                game_age_rating_content_descriptions = []
                            
                            age_rating_object = {
                                'IGDB_age_rating_id': age_rating_data['id']
                            }

                            if (age_rating_data.get('organization')):
                                age_rating_object['organization'] = age_rating_data['organization']

                                organization_response = await IGDB_query("age_rating_organizations", "name", f'id={age_rating_object['organization']}')
                                time.sleep(0.251)
                                
                                if (len(organization_response.json()) > 0):
                                    organization_data = organization_response.json()[0]
                                    if (organization_data.get('name')): age_rating_object['organization_name'] = organization_data['name']
                            
                            if (age_rating_data.get('rating_category')): age_rating_object['rating_category'] = age_rating_data['rating_category']
                            if (age_rating_data.get('rating_cover_url')): age_rating_object['rating_cover_url'] = age_rating_data['rating_cover_url']

                            #print("Rating category data")
                            #print(str(rating_category_data))

                            rating_category_object = {
                                'IGDB_rating_category_id': rating_category_data['id']
                            }
                            if (rating_category_data.get('rating')): rating_category_object['rating'] = rating_category_data['rating']
                            if (rating_category_data.get('organization')): rating_category_object['organization'] = rating_category_data['organization']

                            #age_rating_object['age_rating_category'] = rating_category_data
                            age_rating_object['age_rating_category'] = rating_category_object

                            game_age_rating_content_descriptions.sort(key=lambda description: description['IGDB_content_description_id'])
                            age_rating_object['age_rating_content_descriptions'] = game_age_rating_content_descriptions

                            game_age_ratings.append(age_rating_object)
            
            game_age_ratings.sort(key=lambda rating: rating['organization'])
            game_object['age_ratings'] = game_age_ratings
            print("Finished getting age rating data.")
        else:
            print("No age rating found for this game.")
        
        # Language Supports
        create_header("Language Supports")
        print(f"Searching IGDB API response for language supports of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('language_supports')):
            language_support_array = []
            support_object = {}

            audio_supports = []
            subtitle_supports = []
            interface_supports = []

            language_array = []

            """language_support_response = await IGDB_query("language_supports", "language, language_support_type", f'game={IGDB_game_id}')
            if (len(language_support_response.json()) > 0):
                language_support_data = language_support_response.json()
                for support in language_support_data:
                    if support['language'] not in language_array:
                        print(str(support))
                        language_support_object = {}
                        language_support_object['id'] = support['id']
                        language_support_object['language'] = support['language']

                        language_response = await IGDB_query("languages", "name, native name", f'id={language_object['id']}')

                        if (len(language_response.json()) > 0):
                            language_data = language_response.json()[0]
                            if (language_data.get('id')):
                                language_object = {}

                        language_array.append(support)"""
                        
                    

            for language_support in IGDB_game_data['language_supports']:
                language_support_object = {
                    'IGDB_language_support_id': language_support
                }
                language_support_response = await IGDB_query("language_supports", "language, language_support_type", f'id={language_support}')
                time.sleep(0.251)

                if (len(language_support_response.json()) > 0):
                    language_support_data = language_support_response.json()[0]

                    if (language_support_data.get('language')):
                        language_response = await IGDB_query("languages", "name, native_name", f'id={language_support_data['language']}')
                        time.sleep(0.251)

                        if (len(language_response.json()) > 0):
                            language_data = language_response.json()[0]
                            if (language_data.get('id')):
                                language_object = {
                                    'IGDB_language_id': language_data['id']
                                }
                                if (language_data.get('name')): language_object['name'] = language_data['name']
                                if (language_data.get('native_name')): language_object['native_name'] = language_data['native_name']

                                language_support_object['language'] = language_object

                    if (language_support_data.get('language_support_type')):
                        language_support_type_id = language_support_data['language_support_type']
                        print(f"Getting data for language support type of id {language_support_type_id}...")
                        language_support_type_response = await IGDB_query("language_support_types", "name", f'id={language_support_type_id}')
                        time.sleep(0.251)

                        if (len(language_support_type_response.json()) > 0):
                            language_support_type_data = language_support_type_response.json()[0]
                            if (language_support_type_data.get('id')):
                                language_support_type_object = {
                                    'IGDB_language_support_type_id': language_support_type_data['id']
                                }
                                if (language_support_type_data.get('name')): language_support_type_object['name'] = language_support_type_data['name']

                                if (language_support_type_id == 1):
                                    audio_supports.append(language_data)
                                    #language_data['audio'] = True
                                    #language_support_array.append(language_data)
                                elif (language_support_type_id == 2):
                                    subtitle_supports.append(language_data)
                                    #language_data['subtitles'] = True
                                    #language_support_array.append(language_data)
                                elif (language_support_type_id == 3):
                                    interface_supports.append(language_data)
                                    #language_data['interface'] = True
                                    #language_support_array.append(language_data)
                                
                                print(f"Got data for language support type of id {language_support_type_data['id']}.\n")
                
                language_support_array.append(language_support_object)
                print(f"Got data for language support of id {language_support}.")

            support_object['audio_supports'] = audio_supports
            support_object['subtitle_supports'] = subtitle_supports
            support_object['interface_supports'] = interface_supports

            game_object['language_supports'] = support_object
            print("Finished getting language support data.")
        else:
            print("No language supports found for this game.")
        
        # Game Localizations
        create_header("Game Localizations")
        print(f"Searching IGDB API response for localizations of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('game_localizations')):
            print("Started getting game localizations...")
            game_localization_array = []
            for localization in IGDB_game_data['game_localizations']:
                game_localization_response = await IGDB_query("game_localizations", "name, region", f'id={localization} & game={IGDB_game_id}')
                if (len(game_localization_response.json()) > 0):
                    game_localization_data = game_localization_response.json()[0]
                    if (game_localization_data.get('id')):
                        game_localization_object = {
                            'IGDB_game_localization_id': game_localization_data['id']
                        }
                        if (game_localization_data.get('name')): game_localization_object['name'] = game_localization_data['name']

                        if (game_localization_data.get('region')):
                            region_response = await IGDB_query("regions", "name, identifier, category", f'id={game_localization_data['region']}')

                            if (len(region_response.json()) > 0):
                                region_data = region_response.json()[0]
                                if (region_data.get('id')):
                                    region_object = {
                                        'IGDB_region_id': region_data['id']
                                    }
                                    
                                    assign_item_properties_to_object(region_object, region_data, ["name", "category", "identifier"])

                                    game_localization_object['region'] = region_object

                        game_localization_array.append(game_localization_object)
            
            game_object['game_localizations'] = game_localization_array
            print("Finished getting game localizations.")
        else:
            print("No localizations found for this game.")
        
        # Game Type
        """create_header("Game Type")
        print(f"Searching IGDB API response for type of game with IGDB id of {IGDB_game_id}...")
        if (IGDB_game_data.get('game_type')):
            print("Game type was found for this game.")
            game_type_object = {
                'IGDB_game_type_id': IGDB_game_data['game_type']
            }
            game_type_response = await IGDB_query("game_types", "type", f'id={IGDB_game_data['game_type']}')

            if (len(game_type_response.json()) > 0):
                game_type_data = game_type_response.json()[0]

                if (game_type_data.get('type')): game_type_object['type'] = game_type_data['type']

                game_object['game_type'] = game_type_object
                print("Finished getting game type.")
        else:
            print("No game type found for this game.")"""
        await add_game_type(IGDB_game_data, IGDB_game_id, game_object)
        
        # Game Status
        create_header("Game Status")
        print(f"Searching IGDB API response for status of game with id of {IGDB_game_id}...")
        if (IGDB_game_data.get('game_status')):
            print("Game status found.")

            game_status_response = await IGDB_query("game_statuses", "status", f"id={IGDB_game_data['game_status']}")

            if (len(game_status_response.json()) > 0):
                game_status_data = game_status_response.json()[0]
                if (game_status_data.get('id')):
                    game_status_object = {
                        'IGDB_game_status_id': game_status_data['id']
                    }
                    if (game_status_data.get('status')): game_status_object['status'] = game_status_data['status']
                    game_object['game_status'] = game_status_object
                    print("Finished getting game status.")
        else:
            print("No game status found for this game.")
        
        # Time to Beat
        create_header("Time to Beat")
        print(f"Searching IGDB API response for times to beat of game with id of {IGDB_game_id}...")
        time_to_beat_response = await IGDB_query("game_time_to_beats", "completely, count, hastily, normally", f'game_id={IGDB_game_id}')
        if (len(time_to_beat_response.json()) > 0):
            print("Times to beat found.")
            time_to_beat_data = time_to_beat_response.json()[0]
            if (time_to_beat_data.get('id')):
                game_time_to_beat_object = {
                    'IGDB_time_to_beat_id': time_to_beat_data['id']
                }
                
                assign_item_properties_to_object(game_time_to_beat_object, time_to_beat_data, ["completely", "count", "hastily", "normally"])

                game_object['game_time_to_beat'] = game_time_to_beat_object
                print("Got times to beat.")
        else:
            print("No times to beat were found.")
        
        # Parent Game
        create_header("Parent Game")
        print("Checking if this game has a parent game...")
        if (IGDB_game_data.get('parent_game')):
            parent_count = await games.count_documents({'IGDB_id': IGDB_game_data['parent_game']})
            if (parent_count > 0):
                #game_object['parent_game'] = IGDB_game_data['parent_game']
                game_object['parent_game'] = await append_add_on(IGDB_game_data['parent_game'])
                print("Parent game found for this game.")
            else:
                print("No parent game found for this game.")
        else:
            print("No parent game found for this game.")
        
        # Version Parent
        add_key_basic(IGDB_game_data, 'version_parent', "Version Parent", IGDB_game_id, game_object, "version_parent")

        # DLCs
        #add_key_basic(IGDB_game_data, 'dlcs', "DLCs", IGDB_game_id, game_object, "dlcs")
        """create_header("DLCS")
        if (IGDB_game_data.get('dlcs')):
            dlc_array = []
            for dlc in IGDB_game_data['dlcs']:
                dlc_object = await append_add_on(dlc)
                dlc_array.append(dlc_object)
            
            game_object['dlcs'] = dlc_array"""
        #game_object['dlcs'] = await assign_addons("DLCs", "dlcs", IGDB_game_data, game_object)
        await assign_addons("DLCs", "dlcs", IGDB_game_data, game_object)

        # Expansions
        #add_key_basic(IGDB_game_data, 'expansions', "Expansions", IGDB_game_id, game_object, "expansions")
        #game_object['expansions'] = await assign_addons("Expansions", "expansions", IGDB_game_data)
        await assign_addons("Expansions", "expansions", IGDB_game_data, game_object)

        # Standalone Expansions
        #add_key_basic(IGDB_game_data, 'standalone_expansions', "Standalone Expansions", IGDB_game_id, game_object, "standalone_expansions")
        #game_object['standalone_expansions'] = await assign_addons("Standalone Expansions", "standalone_expansions", IGDB_game_data)
        await assign_addons("Standalone Expansions", "standalone_expansions", IGDB_game_data, game_object)

        # Expanded Games
        #add_key_basic(IGDB_game_data, 'expanded_games', "Expanded Games", IGDB_game_id, game_object, "expanded_games")
        #game_object['expanded_games'] = await assign_addons("Expanded Games", "expanded_games", IGDB_game_data)
        await assign_addons("Expanded Games", "expanded_games", IGDB_game_data, game_object)

        # MongoDB Operation
        create_header("MongoDB Operation")

        # Query
        count_query = await games.count_documents({'IGDB_id': IGDB_game_id})

        current_time = time.time()
        game_object['updated_at'] = current_time

        if (count_query > 0):
            print("Operation: Update")

            query_filter = { 'IGDB_id': IGDB_game_data['id'] }

            update_operation = {
                '$set': game_object
            }

            if (game_object.get('title')):
                print(f"Preparing to update information for {game_object['title']}...")
            
            result = await games.update_one(query_filter, update_operation)
            
            if (game_object.get('title')):
                print(f"{game_object['title']} updated successfully!")
        else:
            print("Operation: Insert")

            game_object['created_at'] = current_time

            insert_operation = game_object

            if (game_object.get('title')):
                print(f"Preparing to insert {game_object['title']} into database...")
            
            result = await games.insert_one(insert_operation)
            
            if (game_object.get('title')):
                print(f"{game_object['title']} added successfully!")
        
        await upsert_external_games(IGDB_game_data, 'dlcs', "DLC")
        await upsert_external_games(IGDB_game_data, 'expansions', "expansion")
        await upsert_external_games(IGDB_game_data, 'standalone_expansions', 'standalone expansion')
        await upsert_external_games(IGDB_game_data, 'expanded_games', "expanded game")
        await upsert_external_games(IGDB_game_data, 'remakes', "remake")
        await upsert_external_games(IGDB_game_data, 'remasters', "remaster")
        await upsert_external_games(IGDB_game_data, 'ports', "port")

    except Exception as e:
        raise Exception(f"Couldn't upsert game with id of {IGDB_game_id} to database: {e}")

# We use a loop to iterate through the game id array
#for id in game_ids:
    #asyncio.run(upsert_game(id))#

def select_popularity_primitive():
    popularity_type_int = -1

    while (popularity_type_int < 0 or popularity_type_int > 8):

        print("Please input which popularity type you would like to filter by.")
        print("1: IGDB Visits")
        print("2: IGDB want to play")
        print("3: IGDB playing")
        print("4: IGDB played")
        print("5: Steam 24hr peak players")
        print("6: Steam positive reviews")
        print("7: Steam Negative Reviews")
        print("8: Steam Total Reviews")

        popularity_type = input('--> ')

        if (int(popularity_type) < 0 or int(popularity_type) > 9):
            while (int(popularity_type) < 0 or int(popularity_type) > 9):
                print("Invalid input.")
                popularity_type = input('--> ')
               
        popularity_type_int = int(popularity_type)

    return popularity_type_int

async def upsert_game_ids(game_ids):
    game_id_array = []

    print("Please select an option to continue.")
    print("1) Popularity API query")
    print("2) Default game ID array")
    print("3) Update all existing games")
    print("4) Similar games for each ID in the default game ID array")
    print("5) Add games of a given genre")
    print("6) Add games of a given game mode")
    upsert_type = input('--> ')

    if (int(upsert_type) < 1 or int(upsert_type) > 6):
        while (int(upsert_type) < 1 or int(upsert_type) > 6):
            print("Please enter a valid upsert type:")
            upsert_type = input("--> ")

    if (upsert_type == "1"):
        print("Selected to use a popularity API query.")

        print("Please input which popularity type you would like to filter by.")
        print("1: IGDB Visits")
        print("2: IGDB want to play")
        print("3: IGDB playing")
        print("4: IGDB played")
        print("5: Steam 24hr peak players")
        print("6: Steam positive reviews")
        print("7: Steam Negative Reviews")
        print("8: Steam Total Reviews")

        popularity_type = input('--> ')

        """popularity_type_int = int(popularity_type)
        if (popularity_type_int > 0 and popularity_type_int < 9):
            game_id_array = await get_popular_games(popularity_type_int)"""
        if (int(popularity_type) < 0 or int(popularity_type) > 9):
            while (int(popularity_type) < 0 or int(popularity_type) > 9):
                print("Invalid input.")
                popularity_type = input('--> ')
               
        popularity_type_int = int(popularity_type)
        if (popularity_type_int > 0 and popularity_type_int < 9):
            game_id_array = await get_popular_games(popularity_type_int)

    elif (upsert_type == "2"):
        print("You have selected to use the default game ID array.")
        game_id_array = game_ids
    elif (upsert_type == "3"):
        print("You have selected to update all existing games.")

        # Because of how the upsert_game function behaves, child games of an existing game will be updated accordingly
        async for game in games.find({ 'parent_game': { '$exists': False }}):
            if (not game.get('parent_game')):
                #game_id_array.append(game['IGDB_id'])
                await upsert_game(game['IGDB_id'])
                
            #game_id_array.append(game['IGDB_id'])

    elif (upsert_type == "4"):
        print("You have selected to upsert similar games based on the contents of the game ID array.")
        for game_id in game_ids:
            similar_game_id_array = await get_similar_games(game_id)
            game_id_array.extend(similar_game_id_array)
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

        match int(genre_choice):
            case 1:
                genre_parameter = 31
            case 2:
                genre_parameter = 33
            case 3:
                genre_parameter = 35
            case 4:
                genre_parameter = 4
            case 5:
                genre_parameter = 25
            case 6:
                genre_parameter = 32
            case 7:
                genre_parameter = 36
            case 8:
                genre_parameter = 7
            case 9:
                genre_parameter = 8
            case 10:
                genre_parameter = 2
            case 11:
                genre_parameter = 9
            case 12:
                genre_parameter = 26
            case 13:
                genre_parameter = 10
            case 14:
                genre_parameter = 11
            case 15:
                genre_parameter = 12
            case 16:
                genre_parameter = 5
            case 17:
                genre_parameter = 13
            case 18:
                genre_parameter = 14
            case 19:
                genre_parameter = 15
            case 20:
                genre_parameter = 24
            case 21:
                genre_parameter = 16
            case 22:
                genre_parameter = 34
            case _:
                genre_parameter = 2

        print(f"Genre parameter: {genre_parameter}")

        popularity_type_int = select_popularity_primitive()

        game_id_array = await get_games_of_attribute("genres", genre_parameter, popularity_type_int)
    elif (upsert_type == "6"):
        mode_choice = 0

        print("You have selected to upsert games of a given game mode.")

        while (mode_choice < 1 or mode_choice > 6):
            print("\nPlease select a game mode:")

            print("1) Single Player")
            print("2) Multiplayer")
            print("3) Co-Op")
            print("4) Split-Screen")
            print("5) MMO")
            print("6) Battle Royale")

            mode_choice_input = input('--> ')
            mode_choice = int(mode_choice_input)

        popularity_type_int = select_popularity_primitive()

        game_id_array = await get_games_of_attribute("game_modes", mode_choice, popularity_type_int)

    #for id in game_ids:
    if (upsert_type == "1" or upsert_type == "2" or upsert_type == "4" or upsert_type == "5" or upsert_type == "6"):
       for id in game_id_array:
          await upsert_game(id)
    
    #for id in game_id_array:
     #  await upsert_game(id)

asyncio.run(upsert_game_ids(game_ids))

print("Finished upserting game ids.") # Message to indicate game id array has been iterated through