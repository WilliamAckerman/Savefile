import express, { type Request, type Response } from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { db } from "../db/mongoDbClient.js";

dotenv.config()

const jsonParser = bodyParser.json()

const getHomePageGamesRouter = express.Router()

getHomePageGamesRouter.get('/', jsonParser, async (req: Request, res: Response) => {
    const unixTimestamp = Date.now() / 1000;

    const project = {
        IGDB_id: 1,
        title: 1,
        cover: 1,
        
        total_rating: 1,
        first_release_date: 1,
        hypes: 1
    }

    const andArray = [
        {
            $or: [
                {
                    "game_type.IGDB_game_type_id": { $exists: false }
                },
                {
                    "game_type.IGDB_game_type_id": 8
                }
            ]
        },
        {
            "cover": { $exists: true }
        }
    ]

    const sectionOrArray = [
        {
            "game_type.IGDB_game_type_id": { $exists: false }
        },{
            "game_type.IGDB_game_type_id": { $in: [8, 9, 10] }
        }
    ]

    const recentlyReleasedHeroArray = [
        {
            "first_release_date": {
                $lt: unixTimestamp
            }
        },
        ...andArray
    ]

    const pipeline = [
        {
            // $facet lets us return results of multiple queries at once
            $facet: {
                //hero_section: {
                    highest_rated: [
                        {
                            $match: {
                                $and: andArray
                            }
                        },
                        {
                            $project: project
                        },
                        {
                            $sort: { total_rating: -1 }
                        },
                        {
                            $limit: 24
                        }
                    ],
                    recently_released_hero: [
                        {
                            $match: {
                                $and: recentlyReleasedHeroArray
                            }
                        },
                        {
                            $project: project
                        },
                        {
                            $sort: {
                                first_release_date: -1
                            }
                        },
                        {
                            $limit: 24
                        }
                    ],
                //},
                //sections: {
                    highest_rated_igdb: [
                        {
                            $match: {
                                $and: [
                                    {
                                        "total_rating": {
                                            $exists: true 
                                        }
                                    },
                                    {
                                        "total_rating_count": {
                                            $exists: true
                                        }
                                    },
                                    {
                                        $or: sectionOrArray
                                    }
                                ]
                            }
                        },
                        {
                            $sort: {
                                "total_rating": -1
                            }
                        },
                        {
                            $limit: 12
                        }
                    ],
                    recently_released: [
                        {
                            $match: {
                                $and: [
                                    {
                                        "first_release_date": {
                                            $lt: unixTimestamp
                                        }
                                    },
                                    {
                                        $or: sectionOrArray
                                    }
                                ]
                            }
                        },
                        {
                            $sort: {
                                "first_release_date": -1
                            }
                        },
                        {
                            $limit: 12
                        }
                    ],
                    coming_soon: [
                        {
                            $match: {
                                $and: [
                                    {
                                        "first_release_date": {
                                            $gt: unixTimestamp
                                        }
                                    },
                                    {
                                        $or: sectionOrArray
                                    }
                                ]
                            }
                        },
                        {
                            $sort: {
                                "first_release_date": 1
                            }
                        },
                        {
                            $limit: 12
                        }
                    ],
                    most_anticipated: [
                        {
                            $match: {
                                $and: [
                                    {
                                        $or: [
                                            {
                                                "first_release_date": {
                                                    $gt: unixTimestamp
                                                }
                                            },
                                            {
                                                "first_release_date": {
                                                    $exists: false
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        $or: sectionOrArray
                                    }
                                ]
                            }
                        },
                        {
                            $sort: {
                                "hypes": -1
                            }
                        },
                        {
                            $limit: 12
                        }
                    ]
                //}
            }
        }
    ]

    try {
        const gamesCollection = db?.collection(process.env.MONGODB_GAME_COLLECTION_NAME!)

        const games = await gamesCollection?.aggregate(pipeline).toArray()

        return res.status(200).json({
            success: true,
            games: games
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
})

export { getHomePageGamesRouter }