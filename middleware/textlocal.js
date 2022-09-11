const Axios = require("axios");

exports.textLocalSMS = async (req, res, next) => {
  const apiKey = "N2E3YTUwMzA3MzQ0NmY0MjcyMzczMTcyNTg1ODcxNjY=";
  const sender = "600010";
  const number = req.body.number;
  const company = "Vikram Solutions";
  const url = "https://bit.ly/3TATyzD";
  const message = encodeURI(
    "Hi there, thank you for sending your first test message from Textlocal. See how you can send effective SMS campaigns here: https://tx.gl/r/2nGVj/"
  );
  try {
    const response = await Axios.get(`https://api.textlocal.in/send/?`, {
      params: { apiKey, sender, numbers: number, message },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.data);
  }
};
