

// const addNote = async () => {
    //   try {
    //     console.log("newNote:", newNote.value);
    //     // console.log("user:", user.value);  // Add this line

    //     // user.value = supabase.auth.getUser();

    //     const usernewResolved = await usernew.value;
    //     // currentUserID.value = usernewResolved.data.user.id;
    //     // console.log('user je', usernewResolved.davalue);
    //     console.log('user je', usernewResolved.data.user.id);

    //     const { data: profile } = await supabase
    //       .from('profiles')
    //       .select('username')
    //       .eq('id', usernewResolved.data.user.id)  // use user.value.id directly
    //       .single();


    //     // Here, you should use user.value directly:
    //     if (newNote.value.trim() === "" || !user.value) {
    //       console.log("Note value is empty or user is not logged in. Skipping insertion.");
    //       return;
    //     }

    //     const { error } = await supabase.from("notes").insert([
    //       {
    //         homescreen: newNote.value,
    //         user_id: usernewResolved.data.user.id,
    //         kreator: profile.username,
    //       },
    //     ]);

    //     if (error) throw error;

    //     console.log("Note added successfully");
    //     newNote.value = ""; // Clear the input after successful insertion
    //   } catch (error) {
    //     console.error("Error inserting note:", error);
    //   }
    // };


