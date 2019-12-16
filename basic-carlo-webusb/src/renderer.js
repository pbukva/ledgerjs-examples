import "babel-polyfill";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import AppEth from "@ledgerhq/hw-app-eth";

const initial =
  "<h1>Connect your Ledger and open Bitcoin app. Click anywhere to start...</h1>";

const $main = document.getElementById("main");
$main.innerHTML = initial;

document.body.addEventListener("click", async () => {
  $main.innerHTML = initial;
  try {
    const transport = await TransportWebUSB.create();
    transport.setDebugMode(true);
    const appEth = new AppEth(transport);
    const { bitcoinAddress } = await appEth.getAddress(
      "44'/60'/0'/0/0",
      false
    );
    const h2 = document.createElement("h2");
    h2.textContent = bitcoinAddress;
    $main.innerHTML = "<h1>Your first Bitcoin address:</h1>";
    $main.appendChild(h2);
    await appEth.getAddress("44'/60'/0'/0/0", true);
  } catch (e) {
    const $err = document.createElement("code");
    $err.style.color = "#f66";
    $err.textContent = String(e);
    $main.appendChild($err);
  }
});
