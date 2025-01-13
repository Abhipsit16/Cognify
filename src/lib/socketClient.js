import { io } from "socket.io-client";
import { networkInterfaces } from "os";

let socket;

function getWifiIPAddress() {
    const nets = networkInterfaces();
    let wifiIP = null;
  
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Check for IPv4 address and ensure it is not internal (not localhost)
        if (net.family === "IPv4" && !net.internal) {
          if (name.toLowerCase().includes("wi-fi") || name.toLowerCase().includes("wlan")) {
            wifiIP = net.address;
          }
        }
      }
    }
  
    return wifiIP || "localhost"; // Fallback to localhost if no Wi-Fi IP is found
  }


const ipAddress = getWifiIPAddress();
socket = io(`192.168.87.64:3001`); // Connect to server
console.log(`Connecting to: http://${ipAddress}:3001`);

export default socket;
