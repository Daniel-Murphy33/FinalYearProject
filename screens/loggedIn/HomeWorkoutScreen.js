import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

const HomeWorkoutScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container} >
            <Image style={styles.headerImage} source={{ url: route.params.image }} />
            <Ionicons style={styles.icon} name="fitness" size={32} color="white" />

            {route.params.excersises.map((item, index) => (
                <Pressable style={styles.gif} key={index}>
                    <Image style={styles.exeImage} source={{url:item.image}} />
                    <View style={{marginLeft: 6}}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.sets}>x{item.sets}</Text>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    )
}

export default HomeWorkoutScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // top: 45,

    },
    headerImage: {
        width: '100%',
        height: 170,
    },
    icon: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    exeImage: {
        height: 90,
        width: 90,
    },
    gif: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    sets: {
        marginTop: 4,
        fontSize: 17,
        color:'gray'
    }
})