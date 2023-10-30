import { useEffect } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { useModal } from '../hooks/modal';

export default function CardItem({ card }) {
  const { visible, toggle, show } = useModal(true);
  const { term, definition } = card;

  useEffect(() => {
    show();
  }, [card.term, show]);

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      onPress={toggle}
    >
      {visible ? (
        <Text>{term}</Text>
      ) : (
        <>
          <Text>{definition}</Text>
        </>
      )}
    </TouchableHighlight>
  );
}