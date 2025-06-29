import { visit } from 'unist-util-visit';

export default function remarkHeadingNumbering() {
  return (tree) => {
    const headingCounts = {};
    const headingNumbers = {};

    visit(tree, 'heading', (node) => {
      const depth = node.depth;
      const textNode = node.children.find(child => child.type === 'text');

      if (textNode) {
        // Reset counts for lower levels when a higher level heading is encountered
        for (let i = depth + 1; i <= 6; i++) {
          headingCounts[i] = 0;
        }

        headingCounts[depth] = (headingCounts[depth] || 0) + 1;

        let currentNumber = '';
        for (let i = 1; i <= depth; i++) {
          currentNumber += (headingCounts[i] || 0) + '.';
        }

        // Store the number for this heading
        headingNumbers[node] = currentNumber;

        // Prepend the number to the heading text
        textNode.value = `${currentNumber} ${textNode.value}`;
      }
    });
  };
}
