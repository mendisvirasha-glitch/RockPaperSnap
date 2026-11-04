import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const COLORS = {
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#1E293B',
  secondaryText: '#64748B',
  border: '#E2E8F0',
  rock: '#EF4444',
  paper: '#0D9488',
  scissors: '#D97706',
  vs: '#6366F1',
  win: '#0D9488',
  draw: '#D97706',
  loss: '#EF4444',
};

const CHOICES = [
  { name: 'Rock', emoji: '✊', color: COLORS.rock },
  { name: 'Paper', emoji: '✋', color: COLORS.paper },
  { name: 'Scissors', emoji: '✌️', color: COLORS.scissors },
];

type Choice = (typeof CHOICES)[number];

export default function PlayScreen() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState('Make your move!');
  const [resultColor, setResultColor] = useState(COLORS.text);

  const [score, setScore] = useState({
    wins: 0,
    draws: 0,
    losses: 0,
  });

  const playGame = (choice: Choice) => {
    const randomNum = Math.floor(Math.random() * 3);
    const compChoice = CHOICES[randomNum];

    setUserChoice(choice);
    setComputerChoice(compChoice);

    if (choice.name === compChoice.name) {
      setResult("It's a Draw! 🤝");
      setResultColor(COLORS.draw);
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (choice.name === 'Rock' && compChoice.name === 'Scissors') ||
      (choice.name === 'Paper' && compChoice.name === 'Rock') ||
      (choice.name === 'Scissors' && compChoice.name === 'Paper')
    ) {
      setResult('You Win! 🎉');
      setResultColor(COLORS.win);
      setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      setResult('Computer Wins! 🤖');
      setResultColor(COLORS.loss);
      setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('Make your move!');
    setResultColor(COLORS.text);
    setScore({ wins: 0, draws: 0, losses: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RPS Showdown</Text>
      <Text style={styles.subtitle}>Rock · Paper · Scissors</Text>

      {/* Scoreboard */}
      <View style={styles.scoreboard}>
        <View style={styles.scoreColumn}>
          <Text style={styles.scoreLabel}>WINS</Text>
          <Text style={[styles.scoreValue, { color: COLORS.win }]}>
            {score.wins}
          </Text>
        </View>

        <View style={styles.scoreDivider} />

        <View style={styles.scoreColumn}>
          <Text style={styles.scoreLabel}>DRAWS</Text>
          <Text style={[styles.scoreValue, { color: COLORS.draw }]}>
            {score.draws}
          </Text>
        </View>

        <View style={styles.scoreDivider} />

        <View style={styles.scoreColumn}>
          <Text style={styles.scoreLabel}>LOSSES</Text>
          <Text style={[styles.scoreValue, { color: COLORS.loss }]}>
            {score.losses}
          </Text>
        </View>
      </View>

      {/* Game Arena */}
      <View style={styles.arena}>
        <View style={styles.playerSection}>
          <Text style={styles.playerTitle}>YOU</Text>
          <View
            style={[
              styles.emojiCircle,
              userChoice && {
                borderColor: userChoice.color,
                backgroundColor: `${userChoice.color}15`,
              },
            ]}
          >
            <Text style={styles.emojiText}>
              {userChoice ? userChoice.emoji : '❓'}
            </Text>
          </View>
        </View>

        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={styles.playerSection}>
          <Text style={styles.playerTitle}>COMPUTER</Text>
          <View
            style={[
              styles.emojiCircle,
              computerChoice && {
                borderColor: computerChoice.color,
                backgroundColor: `${computerChoice.color}15`,
              },
            ]}
          >
            <Text style={styles.emojiText}>
              {computerChoice ? computerChoice.emoji : '❓'}
            </Text>
          </View>
        </View>
      </View>

      {/* Result */}
      <View style={[styles.resultContainer, { borderColor: resultColor }]}>
        <Text style={[styles.resultText, { color: resultColor }]}>
          {result}
        </Text>
      </View>

      <Text style={styles.instruction}>CHOOSE YOUR WEAPON</Text>

      {/* Choice Buttons */}
      <View style={styles.buttonContainer}>
        {CHOICES.map(choice => (
          <TouchableOpacity
            key={choice.name}
            style={[
              styles.button,
              { borderBottomColor: choice.color },
            ]}
            activeOpacity={0.75}
            onPress={() => playGame(choice)}
          >
            <Text style={styles.buttonEmoji}>{choice.emoji}</Text>
            <Text style={styles.buttonText}>{choice.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>🔄 Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 5,
    marginBottom: 25,
  },
  scoreboard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.surface,
    paddingVertical: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  scoreColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreLabel: {
    fontSize: 11,
    color: COLORS.secondaryText,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  scoreValue: {
    fontSize: 26,
    fontWeight: '900',
  },
  scoreDivider: {
    width: 1,
    height: 38,
    backgroundColor: COLORS.border,
  },
  arena: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.surface,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  playerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  emojiCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  emojiText: {
    fontSize: 36,
  },
  vsBadge: {
    backgroundColor: COLORS.vs,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 12,
  },
  vsText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  resultContainer: {
    width: '100%',
    paddingVertical: 17,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: COLORS.surface,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  instruction: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  buttonEmoji: {
    fontSize: 30,
    marginBottom: 6,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    backgroundColor: COLORS.text,
  },
  resetText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});