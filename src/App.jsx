import React, { useState, useCallback } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, Stack, ThemeProvider, CssBaseline, Tooltip } from '@mui/material';
import theme from './theme';
import './App.css';

const PERCENTAGE_OPTIONS = [60, 65, 70, 75, 80, 85, 90];
const GIFS = {
  "attend-gif": Array.from({ length: 10 }, (_, i) => `giphy${i + 1}.gif`),
  "bunk-gif": Array.from({ length: 10 }, (_, i) => `giphy${i + 1}.gif`),
};

const BUNK_SENTENCES = [
  "Your attendance is so stable, even your professors feel insecure. Go bunk {classesCanBeBunked} classes!",
  "You're so regular, they might name a building after you. Celebrate with {classesCanBeBunked} bunks!",
  "Go bunk {classesCanBeBunked} classes and remind everyone you're not a robot!",
  "If attendance were currency, you'd be a billionaire. Spend {classesCanBeBunked} bunks on yourself!",
  "You're so regular, the teacher might start marking you absent just for fun. Go bunk {classesCanBeBunked}!",
  "You've unlocked invisibility mode. Skip {classesCanBeBunked} classes and they'll never know."
];

const ATTEND_SENTENCES = [
  "Bruh, your attendance is more unstable than my Wi-Fi. Attend {attendanceNeeded} classes ASAP!",
  "Your attendance is like a diet plan: barely surviving. Feed it {attendanceNeeded} classes to bulk up!",
  "Right now, even Google Maps can't locate your attendance. {attendanceNeeded} classes to get back on the map!",
  "Bro, your attendance is on life support. {attendanceNeeded} classes or we're pulling the plug!",
  "Your attendance is so low, it's being traded on the black market. {attendanceNeeded} classes to buy it back!",
  "Your attendance is flirting with zero. {attendanceNeeded} classes, or you'll be the next attendance meme!"
];

const App = () => {
  const [result, setResult] = useState("");
  const [present, setPresent] = useState("");
  const [total, setTotal] = useState("");
  const [percentage, setPercentage] = useState(75);
  const [gif, setGif] = useState("");

  const getRandomGif = useCallback((folder) => {
    const randomIndex = Math.floor(Math.random() * GIFS[folder].length);
    return `/gif/${folder}/${GIFS[folder][randomIndex]}`;
  }, []);

  const getRandomSentence = useCallback((sentences, replacements) => {
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    return Object.entries(replacements).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      sentence
    );
  }, []);

  const calculate = useCallback((e) => {
    e.preventDefault();

    const presentNum = Number(present);
    const totalNum = Number(total);

    if (presentNum < 0 || totalNum <= 0 || presentNum > totalNum) {
      return setResult("Please enter valid values.");
    }

    const attendance = (presentNum / totalNum) * 100;
    const attendanceNeeded = Math.ceil((percentage * totalNum - 100 * presentNum) / (100 - percentage));
    const classesCanBeBunked = Math.floor((presentNum - (percentage / 100) * totalNum) / (percentage / 100));

    if (attendance >= percentage) {
      setResult(`${attendance.toFixed(2)}% ${getRandomSentence(BUNK_SENTENCES, { classesCanBeBunked })}`);
      setGif(getRandomGif("bunk-gif"));
    } else {
      setResult(`${attendance.toFixed(2)}% ${getRandomSentence(ATTEND_SENTENCES, { attendanceNeeded, percentage })}`);
      setGif(getRandomGif("attend-gif"));
    }
  }, [present, total, percentage, getRandomGif, getRandomSentence]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1" mt={2} mb={5}>bunkmate.</Typography>
        <Typography variant="h4" mb={5} sx={{ color: 'gray' }}>
          Perfect your bunking strategy!
        </Typography>

        <Stack spacing={4} maxWidth="400px" mx="auto">
          <form onSubmit={calculate}>
            <Stack spacing={2}>
              <Select
                fullWidth
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                sx={{ bgcolor: "background.paper", color: "text.primary" }}
              >
                {PERCENTAGE_OPTIONS.map((val) => (
                  <MenuItem key={val} value={val}>{val}%</MenuItem>
                ))}
              </Select>
              <Tooltip title="Total number of classes conducted till now">
                <TextField
                  label="Classes Attended"
                  variant="outlined"
                  value={present}
                  onChange={(e) => setPresent(e.target.value)}
                  fullWidth
                  type="number"
                />
              </Tooltip>
              <Tooltip title="Total number of classes taken so far">
                <TextField
                  label="Total Classes"
                  variant="outlined"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  fullWidth
                  type="number"
                />
              </Tooltip>
              <Button type="submit" variant="contained" color="primary">
                Calculate
              </Button>
            </Stack>
          </form>
        </Stack>
        
        {result && <Typography variant="h6" sx={{ mt: 2 }}>{result}</Typography>}
        {gif && (
          <Box sx={{ mt: 4 }}>
            <img src={gif} alt="Result GIF" style={{ maxWidth: '250px' }} />
          </Box>
        )}
      </Box>
      
      <Box sx={{ fontSize: '13px', position: 'fixed', bottom: 17, right: 18 }}>
        <Typography variant="body">view bunkmate. on{' '}</Typography>
        <Typography
          variant="body"
          component="a"
          href="https://github.com/vishnu1002/bunk-mate"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontSize: '13px', color: '#eeeeee', textDecoration: 'underline' }}
        >
          Github
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
