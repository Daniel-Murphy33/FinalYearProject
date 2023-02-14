import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';


const ManageClientsScreen = ({ navigation }) => {

  const [client, setClient] = useState("");
  const [searchQuery, setSearchQuery] = useState('');


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.clientBtn}>
      <Text style={styles.clientBtnTxt}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Clients</Text>
      </View>
      <TouchableOpacity style={styles.addClientBtn}>
        <Text style={styles.addClientBtnTxt}>Add Client</Text>
      </TouchableOpacity>
      <View style={styles.body}>
      <Text style={styles.title}>All Clients</Text>
      <FlatList
        data={client}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      </View>
    </SafeAreaView>
  );
};

export default ManageClientsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    top:20
  },
  addClientBtn: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    top:50
  },
  addClientBtnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

