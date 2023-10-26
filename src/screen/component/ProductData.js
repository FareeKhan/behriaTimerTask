import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import { productData } from '../../services/Index'

const ProductData = ({ item, resetCountdown, togglePause }) => {
    const [showProductData, setShowProductData] = useState([])
    const [isLoader, setIsLoader] = useState(false)

    const getProductData = async (id) => {
        setIsLoader(true)
        try {
            const result = await productData(id)
            setShowProductData(result)
            setIsLoader(false)

        } catch (error) {
            console.log(error)
            setIsLoader(false)

        }
    }


    useEffect(() => {
        if (item?.timeInSeconds == 0) {
            getProductData(item?.productId)
        }
    }, [item?.timeInSeconds])

    return (
        <View style={item?.timeInSeconds == 0 ? undefined : styles.renderItemContainer}>
            <Text>ProductID : {item?.productId}</Text>
            {
                item?.timeInSeconds == 0 ?
                    <View style={styles.productBox}  >
                        <View style={styles.productNameBox}>
                            <Text>Product Name:</Text>
                            {isLoader ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <Text>{showProductData?.productName}</Text>
                            )}
                        </View>

                        <View style={styles.productNameBox}>
                            <Text>Price: </Text>
                            {isLoader ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <Text>{showProductData?.price}</Text>
                            )}
                        </View>
                    </View>

                    :
                    <View style={{ width: "35%" }}>
                        <Text style={styles.timerStyle}>{item?.formattedTime}</Text>
                        <View style={styles.buttonBox}>
                            <TouchableOpacity onPress={() => togglePause(item?.productId)} style={[styles.btnStyle, { marginRight: 10,width:70 }]}>
                                <Text style={{ textAlign: "center" }}>{item?.isPaused ? 'RESUME' : 'PAUSE'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => resetCountdown(item?.productId)} style={styles.btnStyle}>
                                <Text>RESET</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }

        </View>
    )
}

export default ProductData

const styles = StyleSheet.create({
    renderItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timerStyle: {
        fontWeight: "600"
    },
    buttonBox: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 5
    },
    btnStyle: {
        borderWidth: 1,
        paddingHorizontal: 5
    },
    productBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginBottom: 10,
        marginTop: 25
    },
    productNameBox: {
        flexDirection: "row",

    }
})