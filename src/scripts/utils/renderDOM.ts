import Block from "./Block";

export default function renderDOM(block: Block, selector: string = "#app") {
    const root = document.querySelector(selector);

    root!.innerHTML = "";
    console.log(block);
    root!.appendChild(block.getContent());
}
