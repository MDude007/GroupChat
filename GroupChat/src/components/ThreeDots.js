import { StyleSheet, View } from "react-native";

const ThreeDots = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.singleDot} />
            <View style={styles.singleDot} />
            <View style={styles.singleDot} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        height: 30,
        width: 30,
        justifyContent: 'space-around'
    },
    singleDot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: 'white'
    }
})

export default ThreeDots;