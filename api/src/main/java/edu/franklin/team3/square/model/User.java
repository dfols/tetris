package edu.franklin.team3.square.model;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

  @Id
  @NonNull
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "userId", nullable = false)
  private Long userId;

  @OneToMany(mappedBy = "user")
  @JsonManagedReference
  private Collection<ScoreEntity> scores;

  @NonNull
  @Column(name = "username")
  private String userName;

  @NonNull
  @Column(name = "display_name")
  private String displayName;

  public User(String userName, String displayName) {
    this.userName = userName;
    this.displayName = displayName;
  }
}
