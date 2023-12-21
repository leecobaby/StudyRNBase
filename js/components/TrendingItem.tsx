import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HTMLView from 'react-native-htmlview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  item?: GitHubTrendingRepo;
  onSelect: () => void;
};

export const TrendingItem: React.FC<Props> = ({item, onSelect}) => {
  if (!item || !item.id) return null;

  const description = '<p>' + item.description + '</p>';

  function FavoriteButton() {
    return (
      <TouchableOpacity style={{padding: 6}} onPress={() => {}}>
        <FontAwesome name={'star-o'} size={26} style={{color: 'red'}} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.fullName}</Text>
        <HTMLView
          value={description}
          onLinkPress={url => {}}
          stylesheet={{
            p: styles.description,
            a: styles.description,
          }}
        />
        <Text style={styles.description}>{item.meta}</Text>
        <View style={styles.row}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Built by: </Text>
            {item.contributors.map((result, i, arr) => {
              return <Image key={i} style={{height: 22, width: 22, margin: 2}} source={{uri: arr[i]}} />;
            })}
          </View>
          <FavoriteButton />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: '#ccc',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    // Android
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
});
