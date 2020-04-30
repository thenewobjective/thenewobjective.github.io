I came across the following blog post: https://devblogs.microsoft.com/oldnewthing/20190318-00/?p=102324

…
ordering of method calls not type checkable?

	how do I express Singleton?
		You don't?
		implies state?
		violates encapsulation?
			also can't express object pools and proxies
	
	how to I express lifecycle order?
		o.init() => o.connected() => o.attributeChanged => o.disconnected()
		
	Have to be different objects?
		RawObject => ConnectedObject => DisconnectedObject => RawOBject?
No mutable private state?