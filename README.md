# compress-uuid

Provides `compressUuid` and `decompressUuid` functions, used in `simmcomm` projects to compress and decompress UUIDs.

# Installation

```bash
npm install @simmcomm/compress-uuid
```

# Use

```typescript
import { compressUuid, decompressUuid } from '@simmcomm/compress-uuid';

const shortFrid = compressUuid('12345678-1234-1234-1234-123456789012');
const longFrid = decompressUuid(shortFrid);
```
