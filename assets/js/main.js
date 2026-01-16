import { $, mountStatusBarClock, wifiSVG, batterySVG } from "./common.js";

mountStatusBarClock($("#clockText"));
$("#statusIcons").innerHTML = wifiSVG() + batterySVG();
