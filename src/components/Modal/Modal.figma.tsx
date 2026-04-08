import figma from '@figma/code-connect';
import { Modal } from './Modal';

figma.connect(
  Modal,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=67-7',
  {
    props: {
      title: figma.string('title'),
    },
    example: ({ title }) => (
      <Modal
        open={true}
        title={title}
        onClose={() => {}}
      >
        Modal content goes here.
      </Modal>
    ),
  }
);
