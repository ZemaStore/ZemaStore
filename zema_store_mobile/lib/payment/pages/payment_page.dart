import 'package:flutter/material.dart';
// import 'package:get/get.dart';

import '../services/payment_servie.dart';

class PaymentPage extends StatefulWidget {
  const PaymentPage({Key? key}) : super(key: key);

  @override
  State<PaymentPage> createState() => _PaymentPageState();
}

class _PaymentPageState extends State<PaymentPage> {
  String subscriptionChosen = '';

  @override
  Widget build(BuildContext context) {
    final PaymentController controller = PaymentController();
    test() {
      setState(() {});
    }

    return Scaffold(
      backgroundColor: Colors.white,
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        child: SingleChildScrollView(
          child: SafeArea(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Image.asset(
                    'assets/payment.png',
                    height: MediaQuery.of(context).size.height * 0.2,
                  ),
                  const Text(
                    'Get access to \$3 billion worth of\nexclusive content',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        letterSpacing: 2,
                        fontWeight: FontWeight.bold,
                        fontSize: 20),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  const Text(
                    'Select a plan that works best for you',
                    style: TextStyle(fontSize: 15),
                  ),
                  buildBillingCard(
                      context,
                      Subscription(
                          type: 'Month',
                          color: subscriptionChosen == 'Month'
                              ? Colors.pinkAccent
                              : Colors.black26,
                          price: '3.33',
                          remark: 'remark',
                          textColor: Colors.white)),
                  buildBillingCard(
                      context,
                      Subscription(
                          type: 'Year',
                          color: subscriptionChosen == 'Year'
                              ? Colors.pinkAccent
                              : Colors.cyanAccent,
                          price: '4.44',
                          remark: 'remark',
                          textColor: Colors.black)),
                  // SnackBar(content: Text('Hello')),
                  ElevatedButton(

                    onPressed: subscriptionChosen.isEmpty? null:  () {
                      if(subscriptionChosen.isEmpty){
                        final snackBar = SnackBar(
                          content: const Text('Please choose Payment method first!'),
                          action: SnackBarAction(
                            textColor: Colors.red,
                            label: 'Close',
                            onPressed: () {
                              // Some code to undo the change.
                            },
                          ),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                      }else{
                        controller.makePayment(amount: '5', currency: 'USD');
                      }

                    },
                    style: ElevatedButton.styleFrom(
                        primary: Colors.black,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 100,
                            vertical: 11),
                        textStyle: const TextStyle(
                            fontSize: 20, fontWeight: FontWeight.bold)),
                    child: const Text('Continue'),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  // InkWell(
                  //   onTap: () {
                  //     // controller.makePayment(amount: '5', currency: 'USD');
                  //     print(subscriptionChosen);
                  //   },
                  //   child: const Padding(
                  //     padding: EdgeInsets.all(8.0),
                  //     child: Text(
                  //       'Make Payment',
                  //       style: TextStyle(color: Colors.black, fontSize: 20),
                  //     ),
                  //   ),
                  // ),
                ]),
          ),
        ),
      ),
    );
  }

  GestureDetector buildBillingCard(
      BuildContext context, Subscription subscription) {
    return GestureDetector(
      onTap: () {
        setState(() {
          subscriptionChosen = subscription.type;
        });
      },
      child: Padding(
        padding: const EdgeInsets.all(18.0),
        child: Container(
          height: 200,
          width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
              color: subscription.color,
              borderRadius: BorderRadius.circular(9)),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.only(left: 8.0, top: 5),
                child: Text(
                  '${subscription.type}ly',
                  style: TextStyle(
                      fontSize: 19,
                      color: subscription.textColor,
                      fontWeight: FontWeight.bold),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    top: 0, left: 3.0, right: 3, bottom: 1),
                child: Container(
                  width: MediaQuery.of(context).size.width,
                  height: 167,
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(6)),
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Text(
                        '\$${subscription.price} / month',
                        style: const TextStyle(
                            fontSize: 30, fontWeight: FontWeight.bold),
                      ),
                      Container(
                          decoration: BoxDecoration(
                              color: subscription.color,
                              borderRadius: BorderRadius.circular(5)),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              'MOST POPULAR',
                              style: TextStyle(
                                  color: subscription.textColor,
                                  fontWeight: FontWeight.bold),
                            ),
                          )),
                      Text(
                        '\$${subscription.price} billed ${subscription.type}ly as a recurrent payment',
                        style: const TextStyle(color: Colors.grey),
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class Subscription {
  final String type;
  final String price;
  final Color color;
  final String remark;
  final Color textColor;
  Subscription(
      {required this.type,
        required this.color,
        required this.price,
        required this.remark,
        required this.textColor});
}
