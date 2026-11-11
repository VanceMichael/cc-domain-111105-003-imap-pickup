import {createHash} from 'node:crypto';
export function inspectMail(bytes) {
  const b=Buffer.from(bytes), split=b.indexOf(Buffer.from('\r\n\r\n'));
  if(split<0) throw new Error('邮件缺少头部结束边界');
  const header=b.subarray(0,split).toString('utf8');
  const lines=header.split('\r\n'); const fields={};let current='';
  for(const line of lines) {
    if(/^[ \t]/.test(line) && current) {fields[current][fields[current].length-1]+=' '+line.trim();continue;}
    const p=line.indexOf(':');if(p<1) throw new Error('邮件头部格式无效');
    current=line.slice(0,p).toLowerCase();(fields[current]??=[]).push(line.slice(p+1).trim());
  }
  return {headers:fields,bodyBytes:b.length-split-4,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')};
}
export const inspect=inspectMail;
