import Block from "../../scripts/utils/block";
import  template  from "./error.hbs";

export interface ErrorProps {
    code: string;
    description: string;
    events: {};
}

export  class AppError extends Block {
    constructor(props: ErrorProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
