import template  from "./loader.hbs";
import {withStore} from "../../scripts/utils/withStore";
import Block from "../../scripts/utils/Block";

export interface loaderProps {
    show?: boolean
}



export  class Loader extends Block {
    constructor(props: loaderProps) {
        super(props);
    }

    protected init() {

    }

    render() {
        this.props.show = this.props.store.state.isLoading;
        return this.compile(template, this.props);
    }



}

export default withStore(Loader);
