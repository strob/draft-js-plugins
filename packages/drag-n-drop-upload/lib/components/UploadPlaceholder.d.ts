import { ContentBlock } from 'draft-js';
import { ReactElement } from 'react';
interface UploadPlaceholderParams {
    block: ContentBlock;
    blockProps: {
        name: string;
    };
}
export default function UploadPlaceholder({ blockProps, block, }: UploadPlaceholderParams): ReactElement;
export {};
