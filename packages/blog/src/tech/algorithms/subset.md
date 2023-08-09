## deterministic subsetting

```go
func deterministicSubset(inss []Instance, size int) []Instance {
	backends := inss
	if len(backends) <= int(size) {
		return backends
	}
	// clientID := "app-blink-1214277-c77699d8b-79gl2"
	// clientID := "app-blink-1214277-c77699d8b-hwdwf"
	clientID := "app-blink-1214277-c77699d8b-9pz2p"
	// clientID := "app-blink-1214277-c77699d8b-bwm7v"
	// clientID := "app-blink-1214277-c77699d8b-g6snm"
	sort.Slice(backends, func(i, j int) bool {
		return backends[i].Hostname < backends[j].Hostname
	})
	fmt.Println(backends[0:5])
	count := len(backends) / size
	// hash得到ID
	id := farm.Fingerprint64([]byte(clientID))
	// 获得rand轮数
	round := int64(id / uint64(count))

	s := rand.NewSource(round)
	ra := rand.New(s)
	//  根据source洗牌
	ra.Shuffle(len(backends), func(i, j int) {
		backends[i], backends[j] = backends[j], backends[i]
	})
	// fmt.Println(backends)
	start := (id % uint64(count)) * uint64(size)
	fmt.Printf("id is %d count is %d size is %d round is %d start is %d \n", id, count, size, round, start)
	return backends[int(start) : int(start)+int(size)]
}
```

由于clientid是随机生成的，subset算法在客户端实例少的情况下，server极不均匀，多的是少的好几倍，当客户端实例多的情况下，会减缓，缩小到20%左右
