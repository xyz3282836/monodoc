# protoc

主站 pb 生成

protoc --proto_path=/Users/zhou/go/src --proto_path=/Users/zhou/go/src/go-common/app/tool/protobuf/pkg/extensions --proto_path=/Users/zhou/go/src/go-live/app/service/play/api --bm_out=explicit_http=true:. api.proto

protoc --proto_path=/Users/zhou/go/src --proto_path=/Users/zhou/go/src/go-common/app/tool/protobuf/pkg/extensions --proto_path=/Users/zhou/go/src/go-live/app/service/play/api --gofast_out=Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/struct.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/wrappers.proto=github.com/gogo/protobuf/types,plugins=grpc:. api.proto
