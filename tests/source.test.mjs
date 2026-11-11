import {test} from 'node:test';
import assert from 'node:assert/strict';
import {inspect, inspectMail} from '../src/source.mjs';
import {readFixture} from '../src/files.mjs';
const sample=await readFixture('message.eml');
test('原件结构与错误边界',async()=>{

assert.equal(inspectMail(sample).headers['message-id'][0],'<synthetic-1@example.invalid>');
assert.ok(inspectMail(sample).bodyBytes>0);assert.match(inspectMail(sample).sha256,/^[a-f0-9]{64}$/);
assert.throws(()=>inspectMail(Buffer.from('Subject: a')),/边界/);
assert.equal(inspectMail(Buffer.from('Subject: a\r\n b\r\n\r\nx')).headers.subject[0],'a b');

});
test('样本读取范围',async()=>{await assert.rejects(readFixture('../package.json'),/越界/);await assert.rejects(readFixture('absent.bin'),/ENOENT/);});
