import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View } from 'react-native';

// CONSTANTS
import { ROUTES } from '../Constants/navigation.constants';
// HOOKS
import { useCards } from '../hooks/data';

export default function FlascardCard({ flashcard }) {
  const navigation = useNavigation();
  const { nameFlashcard, id } = flashcard;
  const cards = useCards(id);

  return (
    <TouchableOpacity
      style={{
        padding: 24,
        marginBottom: 24,
        borderRadius: 12,
      }}
      onPress={() => navigation.navigate(ROUTES.cards.name, { flashcard })}
      activeOpacity={0.5}
    >
      <Text style={{ color: 'black' }}>{nameFlashcard}</Text>

      {!!cards.length && (
        <View>
          <Text>
            {pluralize({ noun: 'Card', number: cards.length })}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}