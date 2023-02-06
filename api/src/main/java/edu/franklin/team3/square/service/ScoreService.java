package edu.franklin.team3.square.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.franklin.team3.square.views.DisplayNameAndScore;
import edu.franklin.team3.square.views.UserNameAndScores;
import edu.franklin.team3.square.model.ScoreEntity;
import edu.franklin.team3.square.model.User;
import edu.franklin.team3.square.repository.UserRepository;
import edu.franklin.team3.square.repository.ScoreRepository;

import java.time.LocalDateTime;

@Service
public class ScoreService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    public ScoreEntity createScore(String userName, int score) throws Exception {
        LocalDateTime date = LocalDateTime.now();
        Optional<User> u1 = userRepository.findByUserName(userName);
        if (!u1.isPresent() || score <= 0) {
            throw new Exception();
        } else {
            User user = userRepository.findByUserName(userName).get();
            return scoreRepository.save(new ScoreEntity(user, score, date));
        }

    }

    public UserNameAndScores getScoreByUserName(String userName) {
        User getUser = userRepository.findByUserName(userName).get();
        UserNameAndScores getScore = new UserNameAndScores();
        getScore.userName = getUser.getUserName();
        getScore.scores = scoreRepository.findAllByUserUserName(userName);
        return getScore;
    }

    public Collection<DisplayNameAndScore> getHighScores() {
        //This might be slow with a lot of entries, not sure
        List<ScoreEntity> scores = scoreRepository.findTop10ByOrderByScoreDesc();
        List<DisplayNameAndScore> highScores = new ArrayList<>();

        for (ScoreEntity score : scores) {
            DisplayNameAndScore displayNameAndScore = new DisplayNameAndScore();
            displayNameAndScore.displayName = score.getUser().getDisplayName();
            displayNameAndScore.score = score.getScore();
            highScores.add(displayNameAndScore);
        }

        return highScores;
    }

    // return top 10 scores from the the Score table
    // if less than 10, return all.
    public Collection<DisplayNameAndScore> getTestHighScores() {

        // THIS IS MOCK DATA
        DisplayNameAndScore score1 = new DisplayNameAndScore();
        score1.displayName = "john";
        score1.score = 1000;

        DisplayNameAndScore score2 = new DisplayNameAndScore();
        score2.displayName = "joe";
        score2.score = 2000;

        DisplayNameAndScore score3 = new DisplayNameAndScore();
        score3.displayName = "dave";
        score3.score = 100;

        DisplayNameAndScore score4 = new DisplayNameAndScore();
        score4.displayName = "mary";
        score4.score = 165;

        DisplayNameAndScore score5 = new DisplayNameAndScore();
        score5.displayName = "bob";
        score5.score = 600;

        DisplayNameAndScore score6 = new DisplayNameAndScore();
        score6.displayName = "kate";
        score6.score = 300;

        DisplayNameAndScore score7 = new DisplayNameAndScore();
        score7.displayName = "ryan";
        score7.score = 10000;

        DisplayNameAndScore score8 = new DisplayNameAndScore();
        score8.displayName = "gabby";
        score8.score = 652;

        DisplayNameAndScore score9 = new DisplayNameAndScore();
        score9.displayName = "lily";
        score9.score = 100003;

        DisplayNameAndScore score10 = new DisplayNameAndScore();
        score10.displayName = "joe";
        score10.score = 1;

        Collection<DisplayNameAndScore> topScores = new ArrayList<DisplayNameAndScore>();
        topScores.add(score1);
        topScores.add(score2);
        topScores.add(score3);
        topScores.add(score4);
        topScores.add(score5);
        topScores.add(score6);
        topScores.add(score7);
        topScores.add(score8);
        topScores.add(score9);
        topScores.add(score10);

        // THIS IS MOCK DATA

        return topScores;
    }

}
