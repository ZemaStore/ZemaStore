class Follower {

  Follower({
    required this.artistId,
    required this.customerId
  });
  final String artistId;
  final String customerId;

  factory Follower.fromJson(Map<String,dynamic> json){
    return Follower(
      artistId: json['artistId'], 
      customerId: json['customerId']
    );
  }

}