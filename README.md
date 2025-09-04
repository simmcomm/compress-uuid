# compress-uuid

Provides `compressUuid` and `decompressUuid` functions, used in `simmcomm` projects to compress and decompress UUIDs.

# Installation

```bash
npm install @simmcomm/internal-agency-client
```

# Use

```typescript
import { compressUuid, decompressUuid } from '@simmcomm/internal-agency-client';

const shortFrid = compressUuid('12345678-1234-1234-1234-123456789012');
const longFrid = decompressUuid(shortFrid);
```
