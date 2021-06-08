import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Register({navigation}) {
    const loginPressHandler = () => {
        navigation.navigate("Main");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký</Text>
            <Text style={styles.description}>Điền thông tin tài khoản</Text>
            <ScrollView showsVerticalScrollIndicator={false} >
                <TextInput style={styles.input} placeholder="Họ và tên" />
                <TextInput style={styles.input} placeholder="Số điện thoại" />
                <TextInput style={styles.input} placeholder="Email" />
                <TextInput secureTextEntry style={styles.input} placeholder="Mật khẩu" />
                <TextInput secureTextEntry style={styles.input} placeholder="Nhập lại mật khẩu" />
            </ScrollView>
            <Text style={styles.checkbox}>Tôi đồng ý với các điều khoản dịch vụ</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={loginPressHandler}>
                <Text style={styles.button}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 26,
    },
    title: {
        marginTop: 75,
        textTransform: "uppercase",
        fontSize: 24,
        lineHeight: 28,
        fontWeight: "bold",
        color: "#017A23",
    },
    description: {
        marginTop: 15,
        fontSize: 18,
        color: "#bbb",
        fontWeight:'200',
    },
    input: {
        backgroundColor: "#96CCA5",
        marginVertical: 10,
        width: 310,
        height: 70,
        borderRadius: 20,
        paddingHorizontal: 20,
        fontSize: 18,
    },
    checkbox: {
        margin: 10,
        fontSize: 14,
        color: "#bbb",
        fontWeight:'200',
    },
    buttonContainer: {
        width: 150,
        height: 40,
        backgroundColor: "#017A23",
        borderRadius: 20,
        paddingVertical: 2,
        marginVertical: 25,
      },
    button: {
        color: "#fff",
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 24,
    },
})