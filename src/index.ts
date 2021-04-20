import { Stream, WritableOptions } from "stream";

type MemoryStreamOptions = WritableOptions & {
  encoding?: 'Buffer' | 'utf8'
}

export default class MemorySteam extends Stream.Writable {
  private buffer: Array<Buffer>;
  private options: MemoryStreamOptions;

  constructor(options: MemoryStreamOptions = {}) {
    if (!options.encoding && !options.objectMode) {
      options.encoding = 'Buffer';
    }
    super(options)
    this.buffer = [];
    this.options = options;
  };

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    if (this.options.encoding === 'Buffer' && encoding === 'utf8') {
      this.buffer.push(Buffer.from(chunk, encoding));
    } else {
      this.buffer.push(chunk);
    }
    callback();
  };

  get() {
    return this.toBuffer();
  };

  toString() {
    return this.buffer.join('');
  };

  toBuffer() {
    return Buffer.concat(this.buffer);
  };
}
