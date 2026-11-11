import {inspect} from './source.mjs';
import {readFixture} from './files.mjs';
const name=process.argv[2]??'message.eml';
console.log(JSON.stringify(inspect(await readFixture(name)),null,2));
