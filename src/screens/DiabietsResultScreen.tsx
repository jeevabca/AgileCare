import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import LottieView from 'lottie-react-native';


type RouteParams = {
    params: {
        res: any;
    };
};


const DiabietsResultScreen = () => {
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const res = route.params.res;

    const prediction = res.prediction;
    const advice = res.health_recommendations.health_advice;
    const isDiabetic = prediction.result === "Diabetic";
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        if (!isDiabetic && showConfetti) {
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 5000); // or match your Lottie animation length
            return () => clearTimeout(timer);
        }
    }, [showConfetti, isDiabetic]);


    return (


        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


            {isDiabetic ? (
                <Image
                    source={require('../assets/diabetic.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            ) : (
                <Image
                    source={require('../assets/non_diabetic.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            )}

            <Text style={[styles.resultText, isDiabetic ? styles.diabetic : styles.nonDiabetic]}>
                {prediction.result}
            </Text>

            <Text style={styles.messageText}>{prediction.message}</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Diagnosis: {advice.current_status.diagnosis}</Text>
                {/* Only show risk level if it exists */}
                {advice.current_status.risk_level && (
                    <Text style={styles.cardSubTitle}>Risk Level: {advice.current_status.risk_level}</Text>
                )}
            </View>

            {/* Show immediate steps for both diabetic and non-diabetic cases */}
            {advice.immediate_steps && advice.immediate_steps.actions && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        {isDiabetic ? "Immediate Steps" : "Recommended Actions"}
                    </Text>
                    {advice.immediate_steps.actions.map((action: string, index: number) => (
                        <Text key={index} style={styles.listText}>• {action || ""}</Text>
                    ))}
                </View>
            )}

            {/* Medication Suggestions - Only show for diabetic cases */}
            {isDiabetic && advice.medication_suggestions && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Medication Information</Text>

                    {/* Disclaimer */}
                    {advice.medication_suggestions.disclaimer && (
                        <View style={styles.disclaimerContainer}>
                            <Text style={styles.disclaimerText}>
                                ⚠️ {advice.medication_suggestions.disclaimer}
                            </Text>
                        </View>
                    )}

                    {/* Oral Medications */}
                    {advice.medication_suggestions.oral_medications && advice.medication_suggestions.oral_medications.length > 0 && (
                        <>
                            <Text style={styles.subHeading}>Oral Medications:</Text>
                            {advice.medication_suggestions.oral_medications.map((medication: any, index: number) => (
                                <View key={index} style={styles.medicationCard}>
                                    <Text style={styles.medicationName}>
                                        {medication.generic_name} ({medication.category})
                                    </Text>
                                    {medication.brand_names && (
                                        <Text style={styles.medicationDetail}>
                                            Brand Names: {medication.brand_names.join(', ')}
                                        </Text>
                                    )}
                                    <Text style={styles.medicationDetail}>
                                        Typical Dosage: {medication.typical_dosage}
                                    </Text>
                                    <Text style={styles.medicationDetail}>
                                        How it works: {medication.mechanism}
                                    </Text>
                                    {medication.considerations && (
                                        <Text style={styles.medicationDetail}>
                                            Note: {medication.considerations}
                                        </Text>
                                    )}
                                    {medication.common_side_effects && (
                                        <Text style={styles.medicationDetail}>
                                            Common side effects: {medication.common_side_effects.join(', ')}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </>
                    )}

                    {/* Injectable Medications */}
                    {advice.medication_suggestions.injectable_medications && advice.medication_suggestions.injectable_medications.length > 0 && (
                        <>
                            <Text style={styles.subHeading}>Injectable Medications:</Text>
                            {advice.medication_suggestions.injectable_medications.map((medication: any, index: number) => (
                                <View key={index} style={styles.medicationCard}>
                                    <Text style={styles.medicationName}>
                                        {medication.generic_name} ({medication.category})
                                    </Text>
                                    {medication.brand_names && (
                                        <Text style={styles.medicationDetail}>
                                            Brand Names: {medication.brand_names.join(', ')}
                                        </Text>
                                    )}
                                    <Text style={styles.medicationDetail}>
                                        Typical Dosage: {medication.typical_dosage}
                                    </Text>
                                    <Text style={styles.medicationDetail}>
                                        How it works: {medication.mechanism}
                                    </Text>
                                    {medication.considerations && (
                                        <Text style={styles.medicationDetail}>
                                            Note: {medication.considerations}
                                        </Text>
                                    )}
                                    {medication.common_side_effects && (
                                        <Text style={styles.medicationDetail}>
                                            Common side effects: {medication.common_side_effects.join(', ')}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </>
                    )}

                    {/* Supplements */}
                    {advice.medication_suggestions.supplements && advice.medication_suggestions.supplements.length > 0 && (
                        <>
                            <Text style={styles.subHeading}>Recommended Supplements:</Text>
                            {advice.medication_suggestions.supplements.map((supplement: any, index: number) => (
                                <View key={index} style={styles.supplementCard}>
                                    <Text style={styles.supplementName}>{supplement.name}</Text>
                                    {supplement.brand_examples && (
                                        <Text style={styles.supplementDetail}>
                                            Brand Examples: {supplement.brand_examples.join(', ')}
                                        </Text>
                                    )}
                                    <Text style={styles.supplementDetail}>
                                        Typical Dosage: {supplement.typical_dosage}
                                    </Text>
                                    <Text style={styles.supplementDetail}>
                                        Benefit: {supplement.benefit}
                                    </Text>
                                    {supplement.form && (
                                        <Text style={styles.supplementDetail}>
                                            Available Forms: {supplement.form}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </>
                    )}
                </View>
            )}

            {/* Diet Plan */}
            {isDiabetic && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Diet Plan</Text>


                    {advice.diet_plan && (
                        <>
                            <Text style={styles.subHeading}>Recommendations:</Text>
                            {advice.diet_plan.recommendations.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>• {item}</Text>
                            ))}
                        </>
                    )}

                    {advice.diet_plan && (
                        <>
                            <Text style={styles.subHeading}>Foods to Eat:</Text>
                            {advice.diet_plan.foods_to_eat.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>✓ {item}</Text>
                            ))}
                        </>
                    )}

                    {advice.diet_plan && (
                        <>
                            <Text style={styles.subHeading}>Foods to Avoid:</Text>
                            {advice.diet_plan.foods_to_avoid.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>✗ {item}</Text>
                            ))}
                        </>
                    )}
                </View>
            )}

            {/* Exercise Plan */}
            {isDiabetic && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Exercise Plan</Text>
                    {advice.exercise_plan && (
                        <>
                            <Text style={styles.subHeading}>Recommendations:</Text>
                            {advice.exercise_plan.recommendations.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>• {item}</Text>
                            ))}
                        </>
                    )}

                    {advice.exercise_plan && (
                        <>
                            <Text style={styles.subHeading}>Weekly Schedule:</Text>
                            {advice.exercise_plan.weekly_schedule.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>✓ {item}</Text>
                            ))}
                        </>
                    )}
                </View>
            )}

            {/* Lifestyle Changes */}
            {advice.lifestyle_changes && advice.lifestyle_changes.recommendations && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Lifestyle Changes</Text>
                    {advice.lifestyle_changes.recommendations.map((item: string, index: number) => (
                        <Text key={index} style={styles.listText}>• {item}</Text>
                    ))}
                </View>
            )}

            {/* Monitoring Schedule */}
            {advice.monitoring_schedule && advice.monitoring_schedule.regular_checks && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Monitoring Schedule</Text>
                    {advice.monitoring_schedule.regular_checks.map((item: string, index: number) => (
                        <Text key={index} style={styles.listText}>• {item}</Text>
                    ))}
                </View>
            )}

            {/* Risk Factors - Show for non-diabetic to help with prevention */}
            {advice.risk_factors && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Risk Factors</Text>
                    {advice.risk_factors.current_risks && (
                        <>
                            <Text style={styles.subHeading}>Current Risks:</Text>
                            {advice.risk_factors.current_risks.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>• {item}</Text>
                            ))}
                        </>
                    )}
                    {advice.risk_factors.prevention && (
                        <>
                            <Text style={styles.subHeading}>Prevention:</Text>
                            {advice.risk_factors.prevention.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>✓ {item}</Text>
                            ))}
                        </>
                    )}
                </View>
            )}

            {/* Mental Health */}
            {advice.mental_health && advice.mental_health.recommendations && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Mental Health</Text>
                    {advice.mental_health.recommendations.map((item: string, index: number) => (
                        <Text key={index} style={styles.listText}>• {item}</Text>
                    ))}
                </View>
            )}

            {/* Preventive Measures */}
            {advice.preventive_measures && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Preventive Measures</Text>
                    {advice.preventive_measures.daily_habits && (
                        <>
                            <Text style={styles.subHeading}>Daily Habits:</Text>
                            {advice.preventive_measures.daily_habits.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>✓ {item}</Text>
                            ))}
                        </>
                    )}
                    {advice.preventive_measures.long_term_strategies && (
                        <>
                            <Text style={styles.subHeading}>Long Term Strategies:</Text>
                            {advice.preventive_measures.long_term_strategies.map((item: string, index: number) => (
                                <Text key={index} style={styles.listText}>✓ {item}</Text>
                            ))}
                        </>
                    )}
                </View>
            )}
            {!isDiabetic && showConfetti && (
                <LottieView
                    source={require('../assets/confettie.json')}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                    autoPlay
                    loop={false}
                    onAnimationFinish={() => setShowConfetti(false)}
                    resizeMode='cover'
                />
            )}
        </ScrollView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    contentContainer: {
        padding: 20,
    },
    image: {
        width: 180,
        height: 180,
        alignSelf: 'center',
        marginBottom: 20,
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    diabetic: {
        color: '#d32f2f',
    },
    nonDiabetic: {
        color: '#2e7d32',
    },
    messageText: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    cardSubTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subHeading: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
        color: '#555',
    },
    listText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 6,
        lineHeight: 20,
    },
    disclaimerContainer: {
        backgroundColor: '#fff3cd',
        borderColor: '#ffeaa7',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    disclaimerText: {
        fontSize: 13,
        color: '#856404',
        fontStyle: 'italic',
        lineHeight: 18,
    },
    medicationCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
    },
    medicationName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    medicationDetail: {
        fontSize: 13,
        color: '#555',
        marginBottom: 3,
        lineHeight: 18,
    },
    supplementCard: {
        backgroundColor: '#f1f8e9',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#4caf50',
    },
    supplementName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 5,
    },
    supplementDetail: {
        fontSize: 13,
        color: '#388e3c',
        marginBottom: 3,
        lineHeight: 18,
    },
});

export default DiabietsResultScreen;