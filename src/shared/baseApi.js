import axios from "axios";
import md5 from "md5";

const baseAPI = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

const now = Date.now();
//Prakhyat
// const publicKey = "5bb84bcce85acc74f42157e8db7b04ad";
// const privateKey = "87ab5383ebc9c6c3ccc145565fe3a606a1376e0e";

//Band
// const publicKey = "e5499f1cdfb6dcfcf25a0c2195c70ef2";
// const privateKey = "2c06a7b8170a8c2405c29db3fceee0176749ebc6";

const publicKey = "d31660c1121b2541de9ac2c4002be7a3";
const privateKey = "841ed7e5186362688aa11a628ae3bdcdd2918b52";

let params = {
  apikey: publicKey,
  ts: now,
};
params.hash = md5(params.ts + privateKey + publicKey);

export { baseAPI, params };
