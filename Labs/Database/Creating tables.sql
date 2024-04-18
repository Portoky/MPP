Use MusicForum
GO

Drop Table Music;

Create Table Music(
	MusicId INT Primary key,
	Title Varchar(100),
	Artist Varchar(100),
	Rating INT,
	GenreId INT,
	Constraint FK_GenreId Foreign Key(GenreId) References Genre(GenreId) on delete cascade,
	Constraint Rating_Constraint Check(Rating > 0 AND Rating < 6)
);
SELECT net_transport
FROM sys.dm_exec_connections
WHERE session_id = @@SPID;