package edu.franklin.team3.square.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.franklin.team3.square.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  public Optional<User> findByUserName(String userName);
}
