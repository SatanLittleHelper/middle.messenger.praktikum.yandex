import Block from "./Block";

export default function renderDOM(block: Block, selector: string = "#app") {
    const root = document.querySelector(selector);

    root!.innerHTML = "";
    root!.appendChild(block.getContent());
    block.dispatchComponentDidMount();
    console.log(block);
}
