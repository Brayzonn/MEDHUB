const router = require("express").Router();
import { Request, Response, NextFunction } from 'express'

import {fetchSongs, spotifySavePlaylist, spotifySignin, spotifyGetToken } from '../controllers/spotifyController'; 

//app endpoints
router.get('/', (req: Request, res: Response , next: NextFunction)=>{
    res.send('HELLO HUMAN')
})

//spotify endpoints
router.post('/spotifysignin', spotifySignin)
router.post('/fetchsongs', fetchSongs) 
router.post('/spotifysaveplaylist', spotifySavePlaylist) 

router.get('/spotifygettoken', spotifyGetToken)


export default router 