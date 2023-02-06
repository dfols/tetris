package edu.franklin.team3.square.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "scores")
public class ScoreEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "scoreId")
  private Long scoreId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "userid", nullable = false)
  @JsonBackReference
  private User user;

  @Column(name = "score")
  private int score;

  @NonNull
  @Column(name = "date")
  private LocalDateTime date;

  public ScoreEntity(User user, int score, LocalDateTime date) {
    this.user = user;
    this.score = score;
    this.date = date;
  }

}
