import React, { useState } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, Stack, ThemeProvider, CssBaseline, Tooltip } from '@mui/material';
import theme from './theme';
import './App.css'; 

const App = () => {
  const [result, setResult] = useState("");
  const [present, setPresent] = useState("");
  const [total, setTotal] = useState("");
  const [percentage, setPercentage] = useState(75);
  const [gif, setGif] = useState("");

  const bunkSentences = [
    "Your attendance is so stable, even your professors feel insecure. Go bunk {classesCanBeBunked} classes!",
    "You’re so regular, they might name a building after you. Celebrate with {classesCanBeBunked} bunks!",
    "Go bunk {classesCanBeBunked} classes and remind everyone you’re not a robot!",
    "If attendance were currency, you’d be a billionaire. Spend {classesCanBeBunked} bunks on yourself!",
    "You’re so regular, the teacher might start marking you absent just for fun. Go bunk {classesCanBeBunked}!",
    "You’ve unlocked invisibility mode. Skip {classesCanBeBunked} classes and they’ll never know."
  ];

  const attendSentences = [
    "Bruh, your attendance is more unstable than my Wi-Fi. Attend {attendanceNeeded} classes ASAP!",
    "Your attendance is like a diet plan: barely surviving. Feed it {attendanceNeeded} classes to bulk up!",
    "Right now, even Google Maps can’t locate your attendance. {attendanceNeeded} classes to get back on the map!",
    "Bro, your attendance is on life support. {attendanceNeeded} classes or we’re pulling the plug!",
    "Your attendance is so low, it’s being traded on the black market. {attendanceNeeded} classes to buy it back!",
    "Your attendance is flirting with zero. {attendanceNeeded} classes, or you’ll be the next attendance meme!"
  ];

  const getRandomGif = (folder) => {
    const gifs = {
      "attend-gif": ["giphy1.gif", "giphy2.gif", "giphy3.gif", "giphy4.gif", "giphy5.gif", "giphy6.gif", "giphy7.gif", "giphy8.gif", "giphy9.gif", "giphy10.gif"],
      "bunk-gif"  : ["giphy1.gif", "giphy2.gif", "giphy3.gif", "giphy4.gif", "giphy5.gif", "giphy6.gif", "giphy7.gif", "giphy8.gif", "giphy9.gif", "giphy10.gif"],
    };

    const randomIndex = Math.floor(Math.random() * gifs[folder].length);
    return `/gif/${folder}/${gifs[folder][randomIndex]}`;
  };

  const getRandomSentence = (sentences, replacements) => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    let sentence = sentences[randomIndex];
    for (const key in replacements) {
      sentence = sentence.replace(`{${key}}`, replacements[key]);
    }
    return sentence;
  };

  const calculate = (e) => {
    e.preventDefault();

    if (present < 0 || total <= 0 || present > total) {
      return setResult("Please enter valid values.");
    }

    const attendance = (present / total) * 100;
    const attendanceNeeded = Math.ceil((percentage * total - 100 * present) / (100 - percentage));
    const classesCanBeBunked = Math.floor((present - (percentage / 100) * total) / (percentage / 100));

    if (attendance >= percentage) {
      const sentence = getRandomSentence(bunkSentences, { classesCanBeBunked });
      setResult(`${attendance.toFixed(2)}% ${sentence}`);
      setGif(getRandomGif("bunk-gif"));
    } else {
      const sentence = getRandomSentence(attendSentences, { attendanceNeeded, percentage });
      setResult(`${attendance.toFixed(2)}% ${sentence}`);
      setGif(getRandomGif("attend-gif"));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ textAlign: "center"}}>
        <Typography variant="body1" mt={2} mb={5}>bunkmate.</Typography>
        <Typography variant="h5" mb={5} sx={{ color: 'gray' }}>
          Calculate your perfect BUNK STREAK!
        </Typography>


        <Stack spacing={4} maxWidth="400px" mx="auto">
          <form onSubmit={calculate}>
            <Stack spacing={2}>
              <Box>
                <Select
                  fullWidth
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  sx={{ 
                    bgcolor: "background.paper",
                    color: "text.primary",
                  }}>
                  {[60, 65, 70, 75, 80, 85, 90].map((val) => (
                    <MenuItem key={val} value={val}>{val}%</MenuItem>
                  ))}
                </Select>
              </Box>
              <Tooltip title="Total number of classes conducted till now">
                <TextField
                  label="Classes Attended"
                  variant="outlined"
                  value={present}
                  onChange={(e) => setPresent(e.target.value)}
                  fullWidth
                />
              </Tooltip>
              <Tooltip title="Total number of classes taken so far">
                <TextField
                  label="Total Classes"
                  variant="outlined"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  fullWidth
                />
              </Tooltip>
              <Button type="submit" variant="contained" color="primary">
                Calculate
              </Button>
            </Stack>
          </form>
        </Stack>
        {result && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            {result}
          </Typography>
        )}
        {gif && (
          <Box sx={{ mt: 4 }}>
            <img src={gif} alt="Result GIF" style={{ maxWidth: '250px' }} />
          </Box>
        )}
      </Box>
      <Box sx={{ fontSize: '13px', position: 'fixed', bottom: 17, right: 18 }}>
        <Typography variant="body">view bunkmate. on{' '} </Typography> 
        <Typography variant="body" component="a" href="https://github.com/vishnu1002/bunk-mate" target="_blank" sx={{fontSize: '13px', color: '#eeeeee', textDecoration: 'underline' }}>
           Github
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;