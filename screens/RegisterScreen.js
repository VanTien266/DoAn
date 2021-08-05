import React, {useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    CheckBox,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function Register({ navigation }) {
    const [input, setInput] = useState({
        name:"",
        phone:"",
        email:"",
        password:"",
        confirm_password:"",
    })
    const loginPressHandler = (input) => {
        if (input.password != input.confirm_password){
            alert("Password didn't match")
        }
        else if (!isSelected){
            alert("Please agree to the terms and services")
        }
        else {
            auth().createUserWithEmailAndPassword(input.email, input.password).then(
                () => {
                    database().ref('/user').push().set({
                        name:input.name,
                        phone:input.phone,
                        email:input.email.toLowerCase(),
                    }),
                    navigation.navigate("Main")
                }
            ).catch((error) => { alert(error.code)})
        }
    };

    const [isSelected, setSelection] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký</Text>
            <Text style={styles.description}>Điền thông tin tài khoản</Text>
            <ScrollView showsVerticalScrollIndicator={false} >
                <TextInput 
                    style={styles.input} 
                    placeholder="Họ và tên" 
                    onChangeText={(value)=>{
                        setInput({
                            name: value,
                            phone:input.phone,
                            email:input.email,
                            password:input.password,
                            confirm_password:input.confirm_password,
                        })
                    }} />
                <TextInput 
                    style={styles.input} 
                    onChangeText={(value)=>{
                        setInput({
                            name: input.name,
                            phone:value,
                            email:input.email,
                            password:input.password,
                            confirm_password:input.confirm_password,
                        })
                    }}
                    placeholder="Số điện thoại" />
                <TextInput 
                    style={styles.input} 
                    keyboardType={"phone-pad"}
                    onChangeText={(value)=>{
                        setInput({
                            name: input.name,
                            phone:input.phone,
                            email:value,
                            password:input.password,
                            confirm_password:input.confirm_password,
                        })
                    }}
                    placeholder="Email" />
                <TextInput 
                    secureTextEntry 
                    keyboardType={"email-address"}
                    style={styles.input} 
                    onChangeText={(value)=>{
                        setInput({
                            name: input.name,
                            phone:input.phone,
                            email:input.email,
                            password:value,
                            confirm_password:input.confirm_password,
                        })
                    }}
                    placeholder="Mật khẩu" />
                <TextInput 
                    secureTextEntry
                    style={styles.input} 
                    onChangeText={(value)=>{
                        setInput({
                            name: input.name,
                            phone:input.phone,
                            email:input.email,
                            password:input.password,
                            confirm_password:value,
                        })
                    }}
                    placeholder="Nhập lại mật khẩu" />
            </ScrollView>
            <View style={styles.accept}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.checkboxText}>Tôi đồng ý với các điều khoản dịch vụ</Text>
            </View>

            <TouchableOpacity 
                style={styles.buttonContainer} 
                onPress={()=>{
                    loginPressHandler(input)
                }}>
                <Text style={styles.button}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontWeight: '200',
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
    accept: {
        marginTop: 10,
        flexDirection: "row",
    },
    checkbox:{
        alignSelf:"center",
    },
    checkboxText: {
        alignSelf:"center",
        //margin: 10,
        fontSize: 14,
        color: "#bbb",
        fontWeight: '200',
    },
    buttonContainer: {
        width: 150,
        height: 40,
        backgroundColor: "#017A23",
        borderRadius: 20,
        paddingVertical: 5,
        marginVertical: 25,
    },
    button: {
        color: "#fff",
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 24,
    },
})