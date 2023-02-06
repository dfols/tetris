package edu.franklin.team3.square.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.franklin.team3.square.model.ScoreEntity;
import edu.franklin.team3.square.service.ScoreService;
import edu.franklin.team3.square.service.UserService;
import edu.franklin.team3.square.views.HighScores;
import edu.franklin.team3.square.views.UserNameAndScore;
import edu.franklin.team3.square.views.UserNameAndScores;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class ScoreController {

    @Autowired
    ScoreService scoreService;

    @Autowired
    UserService userSerivce;

    @PostMapping(value = "/user/score", produces = "application/json")
    public ResponseEntity<?> createScore(@RequestBody UserNameAndScore newScore) {

        try {
            ScoreEntity addedScore = scoreService.createScore(newScore.userName, newScore.score);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedScore);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating new score");
        }
    }

    @GetMapping(value = "/user/scores")
    public ResponseEntity<?> getScoreByUserName(@RequestParam String userName) {
        UserNameAndScores getScore = scoreService.getScoreByUserName(userName);
        try {
            return ResponseEntity.status(HttpStatus.OK).body(getScore);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error getting score");
        }
    }

    @GetMapping(value = "/scores/global")
    public ResponseEntity<?> getHighScores() {
        HighScores topScores = new HighScores();
        topScores.highscores = scoreService.getHighScores();

        try {
            return ResponseEntity.status(HttpStatus.OK).body(topScores);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error getting highscores");
        }
    }

}
