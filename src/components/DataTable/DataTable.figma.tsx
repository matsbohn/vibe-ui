import figma from '@figma/code-connect';
import { DataTable } from './DataTable';

figma.connect(
  DataTable,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=68-7',
  {
    example: () => (
      <DataTable
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
          { key: 'status', header: 'Status' },
        ]}
        rows={[
          { name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active' },
          { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Pending' },
        ]}
      />
    ),
  }
);
