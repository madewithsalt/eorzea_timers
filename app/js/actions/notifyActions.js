export const NODE_ACTIVE = 'NODE_ACTIVE';
export const NODE_INACTIVE = 'NODE_INACTIVE';

export function nodeActive(node) {
  return {
    type: NODE_ACTIVE,
    node
  }
}
