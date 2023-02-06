package edu.franklin.team3.square.repository;

import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.franklin.team3.square.model.ScoreEntity;

@Repository
public interface ScoreRepository extends JpaRepository<ScoreEntity, Long> {
  Collection<ScoreEntity> findAllByUserUserName(String userName);

  List<ScoreEntity> findTop10ByOrderByScoreDesc();
}
