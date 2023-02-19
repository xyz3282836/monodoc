# proto

proto.Marshal slice 会被序列化成nil，而json的序列化对于结构体中slice 为nil和[]是两种不同的结果前者null，后者[]