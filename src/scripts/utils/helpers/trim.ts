trim('  abc  '); // => 'abc'
trim('-_-abc-_-', '_-'); // => 'abc'
trim('\xA0foo'); // "foo"
trim('\xA0foo', ' '); // " foo"
trim('-_-ab c -_-', '_-'); // ab c

['  foo  ', '  bar  '].map(value => trim(value)); // => ['foo', 'bar']

function trim(...arg: string[]) {
    if(!arg) {
        return null;
    }
    const result: string[] = arg.map((item) => {
        const str = item?.replace(/\s/g, "").match(/[a-zA-Z]+/g);
        if (str) {
            return str[0];
        }
        return ''
    })
    return result;
}

export default trim;

