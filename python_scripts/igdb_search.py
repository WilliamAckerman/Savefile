import os
import asyncio
from dotenv import load_dotenv
from requests import post

async def search_for_game(game):
    try:
        igdb_search_response = post(
            'https://api.igdb.com/v4/games',
            **{
                'headers': {
                    'Client-ID': IGDB_CLIENT_ID,
                    'Authorization': IGDB_AUTHORIZATION
                },
                'data':
                    'fields id, name, summary;'
                    f'search \"{game}\";'
            }
        )

        if (len(igdb_search_response.json()) > 0):
            print(f"Displaying search results for \"{game}\":")
            igdb_search_data = igdb_search_response.json()
            for data in igdb_search_data:
                print(str(data))
        else:
            print(f"No search results for \"{game}\" were found.")
    except Exception as e:
        raise Exception(f'IGDB API search error: {e}')

load_dotenv()

IGDB_CLIENT_ID = os.getenv('IGDB_CLIENT_ID')
IGDB_AUTHORIZATION = os.getenv('IGDB_AUTHORIZATION')

print("Please enter the game you would like to search for:")
game_to_search_for = input()

asyncio.run(search_for_game(game_to_search_for))