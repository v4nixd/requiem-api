const EPOCH = 1577836800000n;

let lastTimestamp = 0n;
let sequence = 0n;

export function generateSnowflake(workerId = 1n): string {
  const timestamp = BigInt(Date.now());

  if (timestamp === lastTimestamp) {
    sequence = (sequence + 1n) & 0xfffn;
    if (sequence === 0n) {
      while (BigInt(Date.now()) <= lastTimestamp) {}
    }
  } else {
    sequence = 0n;
  }

  lastTimestamp = timestamp;

  const id = ((timestamp - EPOCH) << 22n) | (workerId << 12n) | sequence;

  return id.toString();
}
