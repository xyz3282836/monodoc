# proto

proto.Marshal slice 会被序列化成 nil，而 json 的序列化对于结构体中 slice 为 nil 和[]是两种不同的结果前者 null，后者[]
